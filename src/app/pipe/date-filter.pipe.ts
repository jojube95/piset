import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'dateFilter'
})
export class DateFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let filtered = [];
    let felterDate: Date;
    let date: Date;

    if(args[0] !== undefined){

      if(args != null && value != null && args[0].toString() !== 'Invalid Date'){
        felterDate = new Date(args[0]);

        value.forEach(element => {
          date = new Date(element.date);

          if(felterDate.getMonth() == date.getMonth() && felterDate.getFullYear() == date.getFullYear()){
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
