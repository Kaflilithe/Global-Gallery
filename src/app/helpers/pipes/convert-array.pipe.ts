import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertArray',
})
export class ConvertArrayPipe implements PipeTransform {
  transform(value: string): string[] | null {
    if (!value) return null;
    return value.split(', ');
  }
}
