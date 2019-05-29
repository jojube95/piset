import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFilter'
})
export class DateFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let filtered = [];
    let felterDate = null;

    if(args != null && value != null){
      console.log(args);

      felterDate = args.name;
      if(felterDate === 'Todos'){
        filtered = value;
      }
      else{
        value.forEach(element => {
          if(element.user.name === felterDate){
            filtered.push(element);
          }
        });
      }
    }
    else{
      filtered = value;
    }

    return filtered;
  }

}
