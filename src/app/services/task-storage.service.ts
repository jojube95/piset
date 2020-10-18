import { Injectable } from '@angular/core';
import { Group } from '../model/group';
import { Task } from '../model/task';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class TaskStorageService {
  constructor(private http: HttpClient) {}

  getGroupTasks(group: Group): Observable<Task[]> {
    return this.http.get<{message: string, groups: any}>('http://localhost:3000/api/tasks/getByGroup' + group._id).pipe(map((groupData) =>{
      return groupData.groups.map((group) => {
        return {
          id: group.id,
          name: group.name,
          users: group.users
        }
      });
    }));
  }

  addTaskToGroup(group: Group, task: Task){
    this.http.post('http://localhost:3000/api/tasks/addToGroup', {task: task, groupId: group._id});
  }

  deleteTaskFromGroup(group: Group, task: Task){
    this.http.post('http://localhost:3000/api/tasks/deleteFromGroup', {groupId: group._id, taskId: task._id});
  }

  updateTask(group: Group, task: Task){
    this.http.post('http://localhost:3000/api/tasks/update', {task: task, groupId: group._id});
  }

  reasignTasks(group: Group){
    this.http.post('http://localhost:3000/api/tasks/reasign', {groupId: group._id}).subscribe(response => {
      console.log(response);
    });
  }
}
