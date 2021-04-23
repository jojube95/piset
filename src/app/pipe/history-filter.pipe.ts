import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'historyFilter'
})
export class HistoryFilterPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const filtered = [];

    const selectedGroup = args[0];
    const selectedUser = args[1];
    const selectedTask = args[2];
    const selectedDate = args[3];

    value.forEach(element => {
      if (((selectedGroup === undefined) || (element.groupId === selectedGroup._id))
          && ((selectedUser === undefined) || (element.userId === selectedUser._id))
          && ((selectedTask === undefined) || (element.taskId === selectedTask._id))
          && ((selectedDate === undefined) ||
              (new Date(element.date).getMonth() === selectedDate.getMonth() && new Date(element.date).getFullYear() === selectedDate.getFullYear()))){


        filtered.push(element);
      }




    });

    return filtered;
  }

}
