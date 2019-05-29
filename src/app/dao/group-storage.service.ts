import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { UserStorageService} from './user-storage.service';
import {Group} from '../model/group';
import {UserModel} from '../model/userModel';

@Injectable({
  providedIn: 'root'
})
export class GroupStorageService {
  constructor(private af: AngularFireDatabase, private afAuth: AngularFireAuth, private userStorage: UserStorageService) {
  }

  getObservableGroups(): Observable<Group[]>{
    return <Observable<Group[]>> this.af.list('groups').snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
      )
    );
  }

  updateGroup(group: Group){
    this.af.object('groups/' + group.key).update(group);
  }

  createGroup(groupObj: Group){
    this.af.list('groups').push(groupObj);
  }

  deleteGroup(group: Group){
    this.af.object('groups/' + group.key).remove();
  }

  addUserToGroup(user: UserModel, group: Group){
    this.af.database.ref().child('groups/' + group.key + '/users/' + user.key).set(user);
  }

  getUsersFromGroup(group: Group): Observable<UserModel[]> {
    return <Observable<UserModel[]>> this.af.list('groups/' + group.key + '/users').valueChanges();
  }



}
