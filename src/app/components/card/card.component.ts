import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {IPackage} from '../../interfaces/IPackage';
import {HighlightPipe} from '../../pipes/highlight.pipe';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    NgIf,
    HighlightPipe
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  changeDetection:  ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  @Input() package!: IPackage;
}
