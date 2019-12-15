import { Injectable } from '@angular/core';
import {Group} from '../model/group';
import {User} from '../model/user';
import {SubTask} from '../model/subTask';
import {Penalty} from '../model/penalty';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import * as io from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class PenaltyStorageService {
  private url = 'http://localhost:5000';
  private socket;

  constructor(private http: HttpClient) {
    this.socket = io(this.url);
  }

  getFilteredPenaltysFromSocket(): Observable<Penalty[]>{
    return new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('penalties-filtered', (data) => {
        observer.next(data);
      });
    });
  }

  getFilteredPenalties(group: Group) {
    this.socket.emit('get-penalties-filtered', group);
  }

  getSubtaskPenaltys(subtask: SubTask): Observable<Penalty[]>{

    /*return this.firestore.collection('penaltys', ref => ref.where('subtaskId', '==', subtask.id)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Penalty;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );*/
    return null;
  }

  createPenalty(group: Group, user: User, subtask: SubTask, penalty: Penalty) {
    this.socket.emit('add-penalty', {group: group, user: user, penalty: penalty});
  }

  deleteGroupPenalty(penalty: Penalty){
    /*
    this.firestore.collection('penaltys').doc(penalty.id).delete();
    */
  }


}
