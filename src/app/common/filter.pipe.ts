import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], filterString: string, propName: string): any[] {
    console.log(value);
    console.log(filterString);
    console.log(propName);
    const resultant: any = [];
    if (!value || !filterString || !propName) return value;

    value.forEach((item: any) => {
      if (
        item[propName].trim().toLowerCase().includes(filterString.toLowerCase())
      )
        resultant.push(item);
    });

    return resultant;
  }
}
