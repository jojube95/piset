import { Injectable } from '@angular/core';
import {Group} from '../model/group';
import {Penalty} from '../model/penalty';
import { Observable } from 'rxjs';
import * as io from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class PenaltyStorageService {
  private url = 'http://localhost:5000';
  private socket;

  constructor() {
    this.socket = io(this.url);
  }

  observeFilteredPenaltysFromSocket(): Observable<Penalty[]>{
    return new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('penalties-filtered', (data) => {
        observer.next(data);
      });
    });
  }

  getFilteredPenalties(group: Group) {
    this.socket.emit('get-penalties-filtered', group._id);
  }


  createPenalty(group: Group, penalty: Penalty) {
    this.socket.emit('add-penalty', {groupId: group._id, penalty: penalty});
  }

  deleteGroupPenalty(penalty: Penalty){
    /*
    this.firestore.collection('penaltys').doc(penalty.id).delete();
    */
  }


}
