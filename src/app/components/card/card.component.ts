import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {IPackage} from '../../interfaces/IPackage';
import {HighlightPipe} from '../../pipes/highlight.pipe';
import {NgClass, NgIf} from '@angular/common';
import {ConversionCountPipe} from '../../pipes/conversion-count.pipe';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    NgIf,
    HighlightPipe,
    ConversionCountPipe,
    NgClass
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  changeDetection:  ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  @Input() package!: IPackage;
  @Input() highlightDependency: boolean = false;
}
