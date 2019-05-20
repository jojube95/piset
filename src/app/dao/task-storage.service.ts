import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Group } from '../model/group';
import { Task } from '../model/task';
import {map} from 'rxjs/operators';
import { SubTask } from '../model/subTask';


@Injectable({
    providedIn: 'root'
})
export class TaskStorageService {
    constructor(private af: AngularFireDatabase) {
    }

    getGroupTasks(group: Group) {
        return this.af.list('groups/' + group.key + '/tasks').snapshotChanges().pipe(
            map(changes =>
              changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
            )
          );
    }

    addGroupTask(group: Group, task: Task){
        this.af.list('groups/' + group.key + '/tasks').push(task);
    }

    deleteGroupTask(group: Group, task: Task){
        this.af.object('groups/' + group.key + '/tasks/' + task.key).remove();
    }

    updateGroupTask(group: Group, task: Task){
        this.af.object('groups/' + group.key + '/tasks/' + task.key).update(task);
    }

    getSubtasks(group: Group, task: Task){
        return this.af.list('groups/' + group.key + '/tasks/' + task.key + '/subtasks').snapshotChanges().pipe(
            map(changes =>
              changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
            )
          );
    }

    addSubTask(group: Group, task: Task, subtask: SubTask){
        this.af.list('groups/' + group.key + '/tasks/' + task.key + '/subtasks').push(subtask);
    }

    deleteSubTask(group: Group, task: Task, subtask: SubTask){
        this.af.object('groups/' + group.key + '/tasks/' + task.key + '/subtasks/' + subtask.key).remove();
    }

    updateSubTask(group: Group, task: Task, subtask: SubTask){
        this.af.object('groups/' + group.key + '/tasks/' + task.key + '/subtasks/' + subtask.key).update(subtask);
    }
}
