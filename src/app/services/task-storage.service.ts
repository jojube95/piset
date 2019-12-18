import { Injectable } from '@angular/core';
import { Group } from '../model/group';
import { Task } from '../model/task';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {HttpClient} from "@angular/common/http";
import * as io from "socket.io-client";


@Injectable({
  providedIn: 'root'
})
export class TaskStorageService {
  private url = 'http://localhost:5000';
  private socket;

  constructor(private http: HttpClient) {
    this.socket = io(this.url);
  }

  observeGroupTasksFromSocket(): Observable<Task[]> {
    return new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('tasks-by-group', (data) => {
        observer.next(data);
      });
    });
  }

  getGroupTasks(group: Group) {
    this.socket.emit('get-tasks-by-group', group._id);
  }

  addTaskToGroup(group: Group, task: Task){
    this.socket.emit('add-task-to-group', {task: task, groupId: group._id});
  }

  deleteTaskFromGroup(group: Group, task: Task){
    this.socket.emit('delete-task-from-group', {groupId: group._id, taskId: task._id});
  }

  updateTask(group: Group, task: Task){
    this.socket.emit('update-task', {task: task, groupId: group._id});
  }
}
