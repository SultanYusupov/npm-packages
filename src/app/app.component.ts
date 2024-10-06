import {
  Component,
  inject, OnDestroy,
  OnInit,
} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CardComponent} from './components/card/card.component';
import {BackendService} from './services/backend.service';
import {IPackage} from './interfaces/IPackage';
import {AsyncPipe, NgIf} from '@angular/common';
import {debounceTime, Subject} from 'rxjs';

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
  private mouseOverSubject = new Subject<any>();
  hasDependencies: boolean = false;

  constructor(private bs: BackendService) {
    this.mouseOverSubject.pipe(debounceTime(2000)).subscribe(id => {
      if (id) this.findDependencies(id);
    })
  }

  ngOnInit() {
    this.bs.getPackages().subscribe(data => this.packages = data);
  }

  onMouseLeave() {
    this.mouseOverSubject.next('');
  }

  onMouseEnter(id:string) {
    this.mouseOverSubject.next(id);
  }

  findDependencies(id: string) {
    if (id.includes('/')) return;
    this.bs.getDependencies(id).subscribe(data => {
      console.log(id, data);
    });
  }

  ngOnDestroy() {
    this.mouseOverSubject.unsubscribe();
  }
}
