import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Group} from '../model/group';
import {UserModel} from '../model/userModel';
import {SubTask} from '../model/subTask';
import {Penalty} from '../model/penalty';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PenaltyStorageService {

  constructor(private af: AngularFireDatabase) { }

  getGroupPenaltys(group: Group): Observable<Penalty[]>{
    return <Observable<Penalty[]>> this.af.list('groups/' + group.key + '/penaltys').snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
      )
    );
  }

  getUserPenaltys(group: Group, user: UserModel){

  }

  createUserPenalty(group: Group, penalty: Penalty) {
    this.af.list('groups/' + group.key + '/penaltys').push(penalty);
  }

  updateUserPenalty(group: Group, user: UserModel, subtask: SubTask, penalty: Penalty){

  }

  deleteUserPenalty(group: Group, user: UserModel, subtask: SubTask, penalty: Penalty){

  }


}
