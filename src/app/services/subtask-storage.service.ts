import { Injectable } from '@angular/core';
import { Task } from '../model/task';
import { SubTask } from '../model/subTask';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from "../model/user";
import {Group} from "../model/group";
import {HttpClient} from "@angular/common/http";
import {List} from "immutable";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubtaskStorageService {
  private API_URL = environment.API_URL;
  public _subtasksTask: BehaviorSubject<List<SubTask>> = new BehaviorSubject(List([]));
  public _subtasksGroup: BehaviorSubject<List<SubTask>> = new BehaviorSubject(List([]));
  public _subtasksUser: BehaviorSubject<List<SubTask>> = new BehaviorSubject(List([]));

  constructor(private http: HttpClient) {}


  getGroupSubtasks(group: Group) {
    return this.http.get<{message: string, subtasks: any}>(this.API_URL + '/api/subtasks/getByGroup' + group._id).subscribe(
      res => {
        let subtasks = (<Object[]>res.subtasks).map((subtask: any) =>
          new SubTask(subtask.name, subtask.description, subtask.penalty, subtask._id, subtask.taskId, subtask.groupId, subtask.userId));

        this._subtasksGroup.next(List(subtasks));
      },
      err => console.log("Error retrieving Todos")
    );
  }
  
  getUserSubtasks(user: User) {
    return this.http.get<{message: string, subtasks: any}>(this.API_URL + '/api/subtasks/getByUser' + user._id).subscribe(
      res => {
        let subtasks = (<Object[]>res.subtasks).map((subtask: any) =>
          new SubTask(subtask.name, subtask.description, subtask.penalty, subtask._id, subtask.taskId, subtask.groupId, subtask.userId));

        this._subtasksUser.next(List(subtasks));
      },
      err => console.log("Error retrieving Todos")
    );
  }

  getTaskSubtasks(task: Task) {
    return this.http.get<{message: string, subtasks: any}>(this.API_URL + '/api/subtasks/getByTask' + task._id).subscribe(
      res => {
        let subtasks = (<Object[]>res.subtasks).map((subtask: any) =>
          new SubTask(subtask.name, subtask.description, subtask.penalty, subtask._id, subtask.taskId, subtask.groupId, subtask.userId));

        this._subtasksTask.next(List(subtasks));
      },
      err => console.log("Error retrieving Todos")
    );
  }

  addSubtaskToTask(subtask: SubTask, task: Task, group: Group){
    this.http.post(this.API_URL + '/api/subtasks/addToTask', {subtask: subtask, taskId: task._id, groupId: group._id}).subscribe(response => {
      //Add task to _subtasksTask and push
      this._subtasksTask.next(this._subtasksTask.getValue().push(subtask));
    });
  }

  updateSubtask(task: Task, updatedSubtask: SubTask){
    this.http.post(this.API_URL + '/api/subtasks/update', {taskId: task._id, subtask: updatedSubtask}).subscribe(response => {
      let subtasks: List<SubTask> = this._subtasksTask.getValue();
      let index = subtasks.findIndex((task) => task._id === updatedSubtask._id);
      this._subtasksTask.next(subtasks.set(index, updatedSubtask));
    });
  }

  deleteSubtask(task: Task, deletedSubtask: SubTask){
    this.http.post(this.API_URL + '/api/subtasks/deleteFromTask', {taskId: task._id, subtaskId: deletedSubtask._id}).subscribe(response => {
      let subtasks: List<SubTask> = this._subtasksTask.getValue();
      let index = subtasks.findIndex((subtask) => subtask._id === deletedSubtask._id);
      this._subtasksTask.next(subtasks.delete(index));
    });
  }
}
