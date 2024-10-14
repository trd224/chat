import { Pipe, PipeTransform } from '@angular/core';
import { format } from "date-fns";


@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(date: any, dateFormat: any): any {
    return format(date, dateFormat);
  }

}
