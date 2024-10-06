import {
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CardComponent} from './components/card/card.component';
import {BackendService} from './services/backend.service';
import {IPackage} from './interfaces/IPackage';
import {AsyncPipe, NgIf} from '@angular/common';
import {debounceTime, Subject, switchMap} from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardComponent, AsyncPipe, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'npm-packages';
  packages: IPackage[] = [];
  dependencies: string[] = [];
  bs = inject(BackendService);
  private mouseOverSubject = new Subject<any>();
  // @ViewChildren('card') card!: QueryList<ElementRef>;

  constructor() {
    this.mouseOverSubject.pipe(debounceTime(2000), switchMap(async (id) => {
      if (id) this.findDependencies(id)
    })).subscribe()
  }

  ngOnInit() {
    this.bs.getPackages().subscribe(data => this.packages = data);
  }

  onMouseLeave() {
    this.mouseOverSubject.next('');
  }

  onMouseEnter(id:string) {
    // this.mouseOverSubject.pipe(debounceTime(1500)).subscribe(id => this.findDependencies(id));
    this.mouseOverSubject.next(id);
  }

  findDependencies(id: string) {
    if (id.includes('/')) return;
    this.bs.getDependencies(id).subscribe(data => {
      console.log(id, data);
    });
  }
}
