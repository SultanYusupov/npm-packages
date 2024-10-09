import {Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild} from '@angular/core';
import {NgClass} from '@angular/common';
import {BackendService} from '../../services/backend.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @ViewChild('searchInput') searchInput!: ElementRef;
  // @Input() sync: boolean = false;
  @Output() filterValue = new EventEmitter<string>();
  @Output() reload = new EventEmitter();
  bs = inject(BackendService);

  inputFilterValue($event: Event) {
    const text = ($event.target as HTMLInputElement).value.trim();
    this.filterValue.emit(text);
  }

  reloadPackages() {
    this.bs.sync = true;
    this.searchInput.nativeElement.value = null;
    this.filterValue.emit('');
    this.reload.emit();
  }
}
