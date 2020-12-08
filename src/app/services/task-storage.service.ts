import { Injectable } from '@angular/core';
import { Group } from '../model/group';
import { Task } from '../model/task';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {List} from "immutable";
import {SubTask} from "../model/subTask";
import {User} from '../model/user';


@Injectable({
  providedIn: 'root'
})
export class TaskStorageService {

  public _tasksGroup: BehaviorSubject<List<Task>> = new BehaviorSubject(List([]));

  constructor(private http: HttpClient) {}

  getGroupTasks(group: Group) {
    return this.http.get<{message: string, tasks: any}>('http://localhost:3000/api/tasks/getByGroup' + group._id).subscribe(
      res => {
        let tasks = (<Object[]>res.tasks).map((task: any) =>
          new Task(task.name, task.subtasks, task._id));

        this._tasksGroup.next(List(tasks));
        console.log(tasks);
      },
      err => console.log("Error retrieving Todos")
    );
  }

  addTaskToGroup(group: Group, task: Task){
    this.http.post('http://localhost:3000/api/tasks/addToGroup', {task: task, groupId: group._id}).subscribe(response => {
      //Add task to _tasksGroup and push
      this._tasksGroup.next(this._tasksGroup.getValue().push(task));
    });
  }

  deleteTaskFromGroup(group: Group, deletedTask: Task){
    this.http.post('http://localhost:3000/api/tasks/deleteFromGroup', {groupId: group._id, taskId: deletedTask._id}).subscribe(response => {
      let tasks: List<Task> = this._tasksGroup.getValue();
      let index = tasks.findIndex((subtask) => subtask._id === deletedTask._id);
      this._tasksGroup.next(tasks.delete(index));
    });
  }

  updateTask(group: Group, updatedTask: Task){
    this.http.post('http://localhost:3000/api/tasks/update', {task: updatedTask, groupId: group._id}).subscribe(response => {
      let tasks: List<Task> = this._tasksGroup.getValue();
      let index = tasks.findIndex((task) => task._id === updatedTask._id);
      this._tasksGroup.next(tasks.set(index, updatedTask));
    });
  }

  getTaskByUser(user: User): Observable<{message, task}>{
    console.log(user);
    return this.http.get<{message: string, task: any}>('http://localhost:3000/api/tasks/getByUser' + user._id);
  }

  reasignTasks(group: Group){
    this.http.post('http://localhost:3000/api/tasks/reasign', {groupId: group._id}).subscribe(response => {
      console.log(response);
    });
  }
}
