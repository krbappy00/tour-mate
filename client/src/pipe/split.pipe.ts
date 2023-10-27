import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'split' })
export class SplitPipe implements PipeTransform {
  transform(value: string, delimiter: string, index: number): string {
    if (!value) return '';
    const splits = value.split(delimiter);
    return splits[index];
  }
}
