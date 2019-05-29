import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let filtered = [];
    let userName = null;

    if(args != null && value != null){
      userName = args.name;
      if(userName === 'Todos'){
        filtered = value;
      }
      else{
        value.forEach(element => {
          if(element.user.name === userName){
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
