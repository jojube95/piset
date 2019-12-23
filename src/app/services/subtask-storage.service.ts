import { Injectable } from '@angular/core';
import { Task } from '../model/task';
import { SubTask } from '../model/subTask';
import {Observable} from 'rxjs';
import * as io from "socket.io-client";
import {User} from "../model/user";
import {Group} from "../model/group";


@Injectable({
  providedIn: 'root'
})
export class SubtaskStorageService {
  private url = 'http://localhost:5000';
  private socket;

  constructor() {
    this.socket = io(this.url);
  }

  observeTasksSubtasksFromSocket(): Observable<SubTask[]> {
    return new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('subtasks-by-task', (data) => {
        observer.next(data);
      });
    });
  }

  observeGroupSubtasksFromSocket(): Observable<SubTask[]>{
    return new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('subtasks-by-group', (data) => {
        observer.next(data);
      });
    });
  }
  
  observeUserSubtasksFromSocket(): Observable<SubTask[]>{
    return new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('subtasks-by-user', (data) => {
        observer.next(data);
      });
    });
  }

  getGroupSubtasks(group: Group) {
    this.socket.emit('get-subtasks-by-group', group._id);
  }
  
  getUserSubtasks(user: User) {
    this.socket.emit('get-subtasks-by-user', user._id);
  }

  getTaskSubtasks(task: Task) {
    this.socket.emit('get-subtask-by-task', task._id);
  }

  addSubtaskToTask(subtask: SubTask, task: Task, group: Group){
    this.socket.emit('add-subtask-to-task', {subtask: subtask, taskId: task._id, groupId: group._id});
  }

  updateSubtask(task: Task, subtask: SubTask){
    this.socket.emit('update-subtask', {taskId: task._id, subtask: subtask});
  }

  deleteSubtask(task: Task, subtask: SubTask){
    this.socket.emit('delete-subtask', {taskId: task._id, subtaskId: subtask._id});
  }
}
