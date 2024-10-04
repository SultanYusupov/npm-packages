import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CardComponent} from './components/card/card.component';
import {BackendService} from './services/backend.service';
import {IPackage} from './interfaces/IPackage';
import {AsyncPipe, NgIf} from '@angular/common';

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
  bs = inject(BackendService);

  ngOnInit() {
    this.bs.getPackages().subscribe(data => this.packages = data);
  }
}
