import {
  Component, OnDestroy,
  OnInit,
} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CardComponent} from './components/card/card.component';
import {BackendService} from './services/backend.service';
import {IPackage} from './interfaces/IPackage';
import {AsyncPipe, NgIf} from '@angular/common';
import {debounceTime, Subject, Subscription} from 'rxjs';
import {HeaderComponent} from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardComponent, AsyncPipe, NgIf, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy{
  packages: IPackage[] = [];
  dependencies: string[] = [];
  private subscription$: Subscription;
  private mouseOverSubject$ = new Subject<any>();
  filterValue: string = '';
  errorMessage: boolean = false;

  constructor(private bs: BackendService) {
    this.subscription$ = this.mouseOverSubject$.pipe(debounceTime(1500)).subscribe(id => {
      if (id) this.findDependencies(id);
    });
  }

  ngOnInit() {
    this.getPackages();
  }

  onMouseLeave() {
    // применение метода complete() и создание нового Subject не помогло
    this.packages.forEach((pkg) => {
      if (pkg.highlighted) {
        delete pkg.highlighted
      }
    });
    this.mouseOverSubject$.next('');
  }

  onMouseEnter(id:string) {
    this.mouseOverSubject$.next(id);
  }

  findDependencies(id: string) {
    if (id.includes('/')) id = id.replace(/\//, '%2F');
    this.bs.getDependencies(id).subscribe(data => {
      for (let p of this.packages) {
        p.highlighted = data.includes(p.id);
      }
    });
  }

  getPackages() {
    this.bs.getPackages().subscribe(data => {
      if (this.errorMessage) this.errorMessage = false;
      this.packages = data;
      this.bs.sync = false;
    }, () => {
      this.bs.sync = false;
      this.errorMessage = true;
    });

  }

  filter(text: string) {
    this.filterValue = text;
    if (!this.filterValue) {
      this.packages = [...this.packages]
    }
  }

  isFiltered(p: any):boolean {
    return p.id.toLowerCase().includes(this.filterValue.toLowerCase());
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
