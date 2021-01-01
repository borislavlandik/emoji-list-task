import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform<T>(items: T[], property: string, filter: string): T[] {
    if(!items || !filter || !filter.trim()) {
      return items;
    }

    return items.filter(item => item[property].indexOf(filter) >= 0);
  }
}
