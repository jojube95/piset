import { Injectable } from '@angular/core';
import { Group } from '../model/group';
import { Task } from '../model/task';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {List} from 'immutable';
import {User} from '../model/user';
import { environment } from '../../environments/environment';
import {UserGroup} from '../model/userGroup';

@Injectable({
  providedIn: 'root'
})
export class TaskStorageService {
  private API_URL = environment.API_URL;
  public _tasksGroups: BehaviorSubject<List<Task>> = new BehaviorSubject(List([]));
  public _tasksGroup: BehaviorSubject<List<Task>> = new BehaviorSubject(List([]));

  constructor(private http: HttpClient) {}

  getUserGroupsTasks(userGroups: UserGroup[]) {
    const params = new HttpParams().set('userGroups', JSON.stringify(userGroups));

    return this.http.get<{message: string, tasks: any}>(this.API_URL + '/api/tasks/getByUserGroups', {params}).subscribe(
      res => {
        const tasks = (res.tasks as Task[]).map((task: any) =>
          new Task(task.name, task.description, task.groupId, task.groupName, task.userId, task.userName, task.dateIni, task.dateEnd,
            task.estimatedTime, task.state, task._id));
        this._tasksGroups.next(List(tasks));
      },
      err => console.log('Error retrieving Todos')
    );
  }

  getGroupTasks(group: Group) {
    return this.http.get<{message: string, tasks: any}>(this.API_URL + '/api/tasks/getByGroup' + group._id).subscribe(
        res => {
          const tasks = (res.tasks as Task[]).map((task: any) =>
              new Task(task.name, task.description, task.groupId, task.groupName, task.userId, task.userName, task.dateIni, task.dateEnd,
                  task.estimatedTime, task.state, task._id));
          this._tasksGroup.next(List(tasks));
        },
        err => console.log('Error retrieving Todos')
    );
  }

  addTaskToGroup(task: Task){
    this.http.post(this.API_URL + '/api/tasks/addToGroup', {task}).subscribe(response => {
      // Add task to _tasksGroup and push
      this._tasksGroups.next(this._tasksGroups.getValue().push(task));
    });
  }

  deleteTaskFromGroup(deletedTask: Task){
    this.http.post(this.API_URL + '/api/tasks/deleteFromGroup', {taskId: deletedTask._id}).subscribe(response => {

      const tasks: List<Task> = this._tasksGroups.getValue();
      const index = tasks.findIndex((task) => task._id === deletedTask._id);
      this._tasksGroups.next(tasks.delete(index));
    });
  }

  updateTask(updatedTask: Task){
    this.http.post(this.API_URL + '/api/tasks/update', {task: updatedTask}).subscribe(response => {
      const tasks: List<Task> = this._tasksGroups.getValue();
      const index = tasks.findIndex((task) => task._id === updatedTask._id);
      this._tasksGroups.next(tasks.set(index, updatedTask));
    });
  }

  getTaskByUser(user: User): Observable<{message, task}>{
    return this.http.get<{message: string, task: any}>(this.API_URL + '/api/tasks/getByUser' + user._id);
  }

  reasignTasks(group: Group){
    this.http.post(this.API_URL + '/api/tasks/reasign', {groupId: group._id}).subscribe(response => {

    });
  }
}
