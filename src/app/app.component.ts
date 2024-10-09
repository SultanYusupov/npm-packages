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
  private originalPackages: IPackage[] = [];
  filterValue: string = '';

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
    this.packages = JSON.parse(JSON.stringify(this.originalPackages));
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
      this.packages = data;
      this.originalPackages = JSON.parse(JSON.stringify(this.packages));
      this.bs.sync = false;
    });

  }

  filter(text: string) {
    this.filterValue = text;
    if (!this.filterValue) {
      this.packages = this.originalPackages;
    }
  }

  isFiltered(p: any):boolean {
    return p.id.toLowerCase().includes(this.filterValue.toLowerCase());
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
