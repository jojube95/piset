import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'historyFilter'
})
export class HistoryFilterPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let filtered = [];

    let selectedGroup = args[0];
    let selectedUser = args[1];
    let selectedTask = args[2];
    let selectedDate = args[3];



    value.forEach(element => {
      console.log('element.date: ' + element.date);
      console.log('selectedDate: ' + selectedDate);

      if(((selectedGroup == undefined) || (element.groupId == selectedGroup._id)) && ((selectedUser == undefined) || (element.userId == selectedUser._id))
          && ((selectedTask == undefined) || (element.taskId == selectedTask._id)) && ((selectedDate == undefined) || (element.date == selectedDate)))

        filtered.push(element);

    });

    return filtered;
  }

}
