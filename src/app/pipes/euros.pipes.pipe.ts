import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eurosPipes'
})
export class EurosPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const euro = value + ' €';
    return euro;
  }

}
