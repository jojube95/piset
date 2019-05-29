import { Pipe, PipeTransform } from '@angular/core';
import { firestore} from 'firebase';

@Pipe({
  name: 'dateFilter'
})
export class DateFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let filtered = [];
    let felterDateStart;
    let felterDateEnd;
    let date;

    if(args != null && value != null){
      felterDateStart = args[0];
      felterDateEnd = args[1];

      value.forEach(element => {
        date = new Date(element.date.seconds * 1000);
        console.log(date);
        if(felterDateStart <= date && felterDateEnd >= date){
            filtered.push(element);
          }
        });
      }

    else{
      filtered = value;
    }

    return filtered;
  }

}
