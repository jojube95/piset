import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'dateFilter'
})
export class DateFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let filtered = [];
    let felterDate: Date;
<<<<<<< HEAD
    let date: Date;
=======
    let dateIni: Date;
    let dateFin: Date;
>>>>>>> dev

    if(args[0] !== undefined){

      if(args != null && value != null && args[0].toString() !== 'Invalid Date'){
        felterDate = new Date(args[0]);

        value.forEach(element => {
<<<<<<< HEAD
          date = new Date(element.date);

          if(felterDate.getMonth() == date.getMonth() && felterDate.getFullYear() == date.getFullYear()){
=======
          dateIni = new Date(element.dateIni);
          dateFin = new Date(element.dateFin);

          if(felterDate.getMonth() == dateIni.getMonth() && felterDate.getFullYear() == dateIni.getFullYear() ||
              felterDate.getMonth() == dateFin.getMonth() && felterDate.getFullYear() == dateFin.getFullYear()){
>>>>>>> dev
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
