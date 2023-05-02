import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class Price implements PipeTransform {
  transform(value: any, args?: any): any {

    return Math.round(+value);
  }
}