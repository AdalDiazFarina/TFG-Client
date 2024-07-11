import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitDecimals',
  standalone: true
})
export class LimitDecimalsPipe implements PipeTransform {

  transform(value: number | string, maxDecimals: number = 2): string {
    if (value == null || isNaN(Number(value))) {
      return value as any;
    }
    const numberValue = Number(value);
    return numberValue.toFixed(maxDecimals);
  }

}