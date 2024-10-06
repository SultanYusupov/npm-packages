import {
  Component, ElementRef, OnDestroy,
  OnInit, QueryList, ViewChildren,
} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CardComponent} from './components/card/card.component';
import {BackendService} from './services/backend.service';
import {IPackage} from './interfaces/IPackage';
import {AsyncPipe, NgIf} from '@angular/common';
import {debounceTime, Subject, Subscription} from 'rxjs';

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
  styleExp: boolean = false;
  @ViewChildren('cards') cards!: QueryList<ElementRef>;
  hoveredIndex: number | null = null;
  private originalPackages: IPackage[] = [];

  constructor(private bs: BackendService) {
    this.subscription$ = this.mouseOverSubject$.pipe(debounceTime(100)).subscribe(id => {
      if (id) this.findDependencies(id);
    });
  }

  ngOnInit() {
    this.bs.getPackages().subscribe(data => {
      this.packages = data;
      this.originalPackages = JSON.parse(JSON.stringify(this.packages));
    });
  }

  onMouseLeave() {
    // применение метода complete() и создание нового Subject не помогло
    this.packages = JSON.parse(JSON.stringify(this.originalPackages));
    this.mouseOverSubject$.next('');
  }

  onMouseEnter(id:string) {
    this.mouseOverSubject$.next(id);
  }

  onCardHover(index: number, isHovered: boolean) {
    this.hoveredIndex = isHovered ? index : null;
  }

  findDependencies(id: string) {
    //TODO с сервера приходит ошибка, если id составное
    if (id.includes('/')) return;
    this.bs.getDependencies(id).subscribe(data => {
      for (let p of this.packages) {
        p.highlighted = data.includes(p.id);
      }
    });
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
