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

  getGroupTasksFromSocket(): Observable<Task[]> {
    return new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('tasks-by-group', (data) => {
        observer.next(data);
      });
    });
  }

  getGroupTasks(group: Group) {
    this.socket.emit('get-tasks-by-group', group);
  }

  addTaskToGroup(group: Group, task: Task){
    this.socket.emit('add-task-to-group', {task: task, group: group});
  }

  deleteTaskFromGroup(group: Group, task: Task){
    this.socket.emit('delete-task-from-group', {group: group, task: task});
  }

  updateTask(group: Group, task: Task){
    this.socket.emit('update-task', {group: group, task: task});
  }

  getUserTasks(user: User): Observable<Task[]>{
    /*
    return this.firestore.collection('tasks', ref => ref.where('userId', '==', user.id)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Task;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    */
    return null;
  }

}
