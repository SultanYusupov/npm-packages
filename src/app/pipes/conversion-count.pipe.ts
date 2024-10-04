import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'conversionCount',
  standalone: true
})
export class ConversionCountPipe implements PipeTransform {

  transform(value: number): string {
    if (value >= 1000 && value < 1000000) {
      return Math.floor(value / 1000)+'K';
    }
    else if (value >= 1000000) {
      return Math.floor(value / 1000000)+'M';
    }
    else {
      return String(value);
    }
  }
}
