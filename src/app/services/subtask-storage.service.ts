import { Injectable } from '@angular/core';
import { Task } from '../model/task';
import { SubTask } from '../model/subTask';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from "../model/user";
import {Group} from "../model/group";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class SubtaskStorageService {

  constructor(private http: HttpClient) {}


  getGroupSubtasks(group: Group): Observable<SubTask[]> {
    return this.http.get<{message: string, users: any}>('http://localhost:3000/api/subtasks/getByGroup' + group._id).pipe(map((userData) =>{
      return userData.users.map((user) => {
        return {
          mail: user.mail,
          password: user.password,
          name: user.name,
          secondName: user.secondName,
          admin: user.admin,
          id: user.id,
          groupId: user.groupId || null
        }
      });
    }));
  }
  
  getUserSubtasks(user: User): Observable<SubTask[]> {
    return this.http.get<{message: string, users: any}>('http://localhost:3000/api/subtasks/getByUser' + user._id).pipe(map((userData) =>{
      return userData.users.map((user) => {
        return {
          mail: user.mail,
          password: user.password,
          name: user.name,
          secondName: user.secondName,
          admin: user.admin,
          id: user.id,
          groupId: user.groupId || null
        }
      });
    }));
  }

  getTaskSubtasks(task: Task): Observable<SubTask[]> {
    return this.http.get<{message: string, users: any}>('http://localhost:3000/api/subtasks/getByTask' + task._id).pipe(map((userData) =>{
      return userData.users.map((user) => {
        return {
          mail: user.mail,
          password: user.password,
          name: user.name,
          secondName: user.secondName,
          admin: user.admin,
          id: user.id,
          groupId: user.groupId || null
        }
      });
    }));
  }

  addSubtaskToTask(subtask: SubTask, task: Task, group: Group){
    this.http.post('http://localhost:3000/api/subtasks/addToTask', {subtask: subtask, taskId: task._id, groupId: group._id}).subscribe(response => {
      console.log(response);
    });
  }

  updateSubtask(task: Task, subtask: SubTask){
    this.http.post('http://localhost:3000/api/subtasks/update', {taskId: task._id, subtask: subtask}).subscribe(response => {
      console.log(response);
    });
  }

  deleteSubtask(task: Task, subtask: SubTask){
    this.http.post('http://localhost:3000/api/subtasks/deleteFromTask', {taskId: task._id, subtaskId: subtask._id}).subscribe(response => {
      console.log(response);
    });
  }
}
