import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @ViewChild('searchInput') searchInput!: ElementRef;
  @Output() filterValue = new EventEmitter<string>();
  @Output() reload = new EventEmitter();

  inputFilterValue($event: Event) {
    const text = ($event.target as HTMLInputElement).value.trim();
    this.filterValue.emit(text);
  }

  reloadPackages() {
    this.searchInput.nativeElement.value = null;
    this.filterValue.emit('');
    this.reload.emit();
  }
}
