import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskFilter',
  pure: false
})
export class TaskFilterPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let filtered = [];

    let state = args[0];
    let group = args[1];
    let user = args[2];


    value.forEach(element => {
      if((element.state._id == state._id) && ((group == undefined) || (element.groupId == group._id)) && ((user == undefined) || (element.userId == user._id)))

        filtered.push(element);

    });

    return filtered;
  }

}
