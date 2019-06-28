import { Injectable } from '@angular/core';
import {Group} from '../model/group';
import {UserModel} from '../model/userModel';
import {SubTask} from '../model/subTask';
import {Penalty} from '../model/penalty';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import {AngularFirestore} from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class PenaltyStorageService {

  constructor(private firestore: AngularFirestore) { }

  getGroupPenaltys(group: Group): Observable<Penalty[]>{
    return this.firestore.collection('penaltys', ref => ref.where('groupId', '==', group.id)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Penalty;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getUserPenaltys(user: UserModel): Observable<Penalty[]>{
    return this.firestore.collection('penaltys', ref => ref.where('userId', '==', user.id)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Penalty;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getSubtaskPenaltys(subtask: SubTask): Observable<Penalty[]>{
    return this.firestore.collection('penaltys', ref => ref.where('subtaskId', '==', subtask.id)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Penalty;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  createUserPenalty(group: Group, user: UserModel, subtask: SubTask, penalty: Penalty) {
    this.firestore.collection('penaltys').add({
      date: penalty.date,
      amount: penalty.amount,
      userId: user.id,
      userName: user.name,
      groupId: group.id,
      groupName: group.name,
      subtaskId: subtask.id,
      subtaskName: subtask.name

    });
  }

  deleteGroupPenalty(penalty: Penalty){
    this.firestore.collection('penaltys').doc(penalty.id).delete();
  }


}
