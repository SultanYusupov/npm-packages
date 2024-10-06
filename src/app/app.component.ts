import {
  Component, OnDestroy,
  OnInit,
} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CardComponent} from './components/card/card.component';
import {BackendService} from './services/backend.service';
import {IPackage} from './interfaces/IPackage';
import {AsyncPipe, NgIf} from '@angular/common';
import {debounceTime, Subject, Subscription, take, takeUntil} from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardComponent, AsyncPipe, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy{
  packages: IPackage[] = [];
  dependencies: string[] = [];
  private subscription$: Subscription;
  private mouseOverSubject$ = new Subject<any>();
  styleExp: string = '';

  constructor(private bs: BackendService) {
    this.subscription$ = this.mouseOverSubject$.pipe(debounceTime(2000)).subscribe(id => {
      if (id) this.findDependencies(id);
    });
  }

  ngOnInit() {
    this.bs.getPackages().subscribe(data => this.packages = data);
  }

  onMouseLeave() {
    // применение метода complete() и создание нового Subject не помогло
    this.mouseOverSubject$.next('');
  }

  onMouseEnter(id:string) {
    this.mouseOverSubject$.next(id);
  }

  findDependencies(id: string) {
    if (id.includes('/')) return;
    this.bs.getDependencies(id).subscribe(data => {
      console.log(id, data);
    });
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
