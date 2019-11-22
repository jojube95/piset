import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'dateFilter'
})
export class DateFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let filtered = [];
    let felterDateStart;
    let felterDateEnd;
    let date;
    if(args[0] !== undefined && args[1].toString() !== undefined){
      if(args != null && value != null && args[0].toString() !== 'Invalid Date' && args[1].toString() !== 'Invalid Date'){
        felterDateStart = args[0];
        felterDateEnd = args[1];

        value.forEach(element => {
          date = new Date(element.date.seconds * 1000);
          if(felterDateStart <= date && felterDateEnd >= date){
            filtered.push(element);
          }
        });
      }

      else{
        filtered = value;
      }
    }
    else{
      filtered = value;
    }


    return filtered;
  }

}
