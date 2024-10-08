import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() filterValue = new EventEmitter<Event>();

  inputFilterValue($event: Event) {
    this.filterValue.emit($event);
  }
}
