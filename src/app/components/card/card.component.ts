import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {IPackage} from '../../interfaces/IPackage';
import {HighlightPipe} from '../../pipes/highlight.pipe';
import {NgClass, NgIf, NgStyle} from '@angular/common';
import {ConversionCountPipe} from '../../pipes/conversion-count.pipe';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    NgIf,
    HighlightPipe,
    ConversionCountPipe,
    NgClass,
    NgStyle
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  changeDetection:  ChangeDetectionStrategy.OnPush
})
export class CardComponent{
  @Input() package!: IPackage;
  @Input() styleExp: boolean = false;
  @Input() highlighted?: boolean = false;
  @Output() hoverEvent = new EventEmitter<boolean>();
}
