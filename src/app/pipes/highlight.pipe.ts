import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
  standalone: true
})
export class HighlightPipe implements PipeTransform {

  transform(value: string): {dependency: string, packageName: string} {
    const dividedString = value.split('/');
    return {
      dependency: dividedString[0],
      packageName: dividedString[1] || ''
    }
  }

}
