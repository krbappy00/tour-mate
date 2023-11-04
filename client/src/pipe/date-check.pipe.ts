import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateCheck',
})
export class DateCheckPipe implements PipeTransform {
  transform(value: string): string {
    const currentDate = new Date();
    const targetDate = new Date(value);

    const timeDiff = Math.abs(targetDate.getTime() - currentDate.getTime());
    const hoursDiff = Math.floor(timeDiff / (1000 * 3600));
    const minutesDiff = Math.floor((timeDiff / (1000 * 60)) % 60);

    if (targetDate.toDateString() === currentDate.toDateString()) {
      if (hoursDiff > 0) {
        if (minutesDiff > 0) {
          return `${hoursDiff} hour${
            hoursDiff > 1 ? 's' : ''
          } ${minutesDiff} minute${minutesDiff > 1 ? 's' : ''} left`;
        }
        return `${hoursDiff} hour${hoursDiff > 1 ? 's' : ''} left`;
      } else if (minutesDiff > 0) {
        return `${minutesDiff} minute${minutesDiff > 1 ? 's' : ''} left`;
      } else {
        return 'Less than a minute left';
      }
    } else if (targetDate.getTime() > currentDate.getTime()) {
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      if (daysDiff > 1) {
        return `${daysDiff} days left`;
      } else if (daysDiff === 1) {
        return `1 day left`;
      }
    }
    return 'Completed';
  }
}
