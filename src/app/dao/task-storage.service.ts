import { Injectable } from '@angular/core';
import { Group } from '../model/group';
import { Task } from '../model/task';
import {map} from 'rxjs/operators';
import { SubTask } from '../model/subTask';
import {Observable} from 'rxjs';
import {AngularFirestore} from 'angularfire2/firestore';
import {Penalty} from '../model/penalty';


@Injectable({
    providedIn: 'root'
})
export class TaskStorageService {
    constructor(private firestore: AngularFirestore) {
    }

    getGroupTasks(group: Group): Observable<Task[]> {
      return this.firestore.collection('tasks', ref => ref.where('groupId', '==', group.id)).snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as Task;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
    }

    addTaskToGroup(group: Group, task: Task){
      this.firestore.collection('tasks').add({
        name: task.name
      }).then(async value => {
        task.groupId = await group.id;
        await this.firestore.collection('tasks').doc(value.id).update({
          name: task.name,
          groupId: task.groupId
        });
      });


    }

    deleteTaskFromGroup(group: Group, task: Task){
      task.groupId = null;
      this.firestore.collection('tasks').doc(task.id).update(task);
    }

    updateGroupTask(group: Group, task: Task){
      task.groupId = group.id;
      this.firestore.collection('tasks').doc(task.id).update({
        name: task.name,
        groupId: task.groupId,
        userId: (task.userId === undefined)? null : task.userId
      });
    }

    getTaskSubtasks(task: Task): Observable<SubTask[]>{
      return this.firestore.collection('subtasks', ref => ref.where('taskId', '==', task.id)).snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as SubTask;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
    }

    getGroupSubtaks(group: Group){
      return this.firestore.collection('subtasks', ref => ref.where('groupId', '==', group.id)).snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as SubTask;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
    }

    getGroupTaskSubtaks(group: Group, task: Task){
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
  }


    addSubTask(group: Group, task: Task, subtask: SubTask){
      subtask.groupId = group.id;
      subtask.taskId = task.id;
      this.firestore.collection('subtasks').add({
        name: subtask.name,
        description: subtask.description,
        penalty: subtask.penalty,
        taskId: subtask.taskId,
        groupId: subtask.groupId
      });
    }

    deleteSubTask(subtask: SubTask){
      this.firestore.collection('subtasks').doc(subtask.id);
    }

    updateSubTask(subtask: SubTask){
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
      });
    }
}
