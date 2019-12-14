import { Injectable } from '@angular/core';
import { Task } from '../model/task';
import { SubTask } from '../model/subTask';
import {Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import * as io from "socket.io-client";
import {User} from "../model/user";
import {Group} from "../model/group";


@Injectable({
  providedIn: 'root'
})
export class SubtaskStorageService {
  private url = 'http://localhost:5000';
  private socket;

  constructor(private http: HttpClient) {
    this.socket = io(this.url);
  }

  getTasksSubtasksFromSocket(): Observable<SubTask[]> {
    return new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('subtasks-by-task', (data) => {
        observer.next(data);
      });
    });
  }

  getTaskSubtasks(task: Task) {
    this.socket.emit('get-subtask-by-task', task);
  }

  addSubtaskToTask(subtask: SubTask, task: Task, group: Group){
    this.socket.emit('add-subtask-to-task', {subtask: subtask, task: task, group: group});
  }

  updateSubtask(task: Task, subtask: SubTask){
    this.socket.emit('update-subtask', {task: task, subtask: subtask});
  }

  deleteSubtask(task: Task, subtask: SubTask){
    this.socket.emit('delete-subtask', {task: task, subtask: subtask});
  }

  getUserSubtasks(user: User): Observable<SubTask[]>{
    return null;
  }

  getGroupSubtasks(group: Group): Observable<SubTask[]>{
    return null;
  }
}
