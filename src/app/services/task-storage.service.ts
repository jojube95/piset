import { Injectable } from '@angular/core';
import { Group } from '../model/group';
import { Task } from '../model/task';
import {map} from 'rxjs/operators';
import { SubTask } from '../model/subTask';
import {Observable} from 'rxjs';
import {Penalty} from '../model/penalty';
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

  getTaskSubtasks(task: Task) {
    /*
    return this.firestore.collection('subtasks', ref => ref.where('taskId', '==', task.id)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as SubTask;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );*/
  }

  getGroupSubtaks(group: Group) : Observable<SubTask[]>{
    /*
    return this.firestore.collection('subtasks', ref => ref.where('groupId', '==', group.id)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as SubTask;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    */
    return null;
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

  getUserSubTasks(user: User): Observable<SubTask[]>{
    /*
  return this.firestore.collection('subtasks', ref => ref.where('userId', '==', user.id)).snapshotChanges().pipe(
    map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as SubTask;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    })
  );
  */
    return null;
  }

  getGroupTaskSubtaks(group: Group, task: Task): Observable<SubTask[]>{
    /*
    return this.firestore.collection('subtasks',
        ref => ref.where('groupId', '==', group.id).where('taskId', '==', task.id)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as SubTask;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    */
    return null;
  }


  addSubTask(group: Group, task: Task, subtask: SubTask){
    /*
    subtask.groupId = group.id;
    subtask.taskId = task.id;
    this.firestore.collection('subtasks').add({
      name: subtask.name,
      description: subtask.description,
      penalty: subtask.penalty,
      taskId: subtask.taskId,
      groupId: subtask.groupId
    });
    */
  }

  deleteSubTask(subtask: SubTask){
    /*
    this.firestore.collection('subtasks').doc(subtask.id);*/
  }

  updateSubTask(subtask: SubTask){
    /*
    this.firestore.collection('subtasks').doc(subtask.id).update({
      name: subtask.name,
      description: subtask.description,
      penalty: subtask.penalty,
      taskId: subtask.taskId,
      groupId: subtask.groupId
    });

    this.firestore.collection('penaltys', ref => ref.where('subtaskId', '==', subtask.id)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Penalty;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    ).subscribe(penalty => {
      this.firestore.collection('penaltys').doc(penalty[0].id).update({
        date: penalty[0].date,
        amount: penalty[0].amount,
        userId: penalty[0].id,
        userName: penalty[0].userName,
        groupId: penalty[0].groupId,
        groupName: penalty[0].groupName,
        subtaskId: subtask.id,
        subtaskName: subtask.name
      });
    });*/
  }
}
