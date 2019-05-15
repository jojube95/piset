import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Observable} from 'rxjs';

import {AngularFireAuth} from 'angularfire2/auth';
import {map} from 'rxjs/operators';
import { UserStorageService} from './user-storage.service';
import {Group} from '../model/group';
import {UserModel} from '../model/userModel';

@Injectable({
  providedIn: 'root'
})
export class GroupStorageService {
  groupsRef: AngularFireList<any>;

  groupsObservable: Observable<Group[]>;

  constructor(private af: AngularFireDatabase, private afAuth: AngularFireAuth, private userStorage: UserStorageService) {
    this.groupsRef = this.af.list('groups');
    this.groupsObservable = this.groupsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
      )
    );
  }

  getObservableGroups(){
    return this.groupsObservable;
  }

  getGroupsFireList(){
    return this.groupsRef;
  }

  getCurrentUserGroup(){
    return null;
  }

  updateGroup(group: Group){
    this.af.object('groups/' + group.uid).update(group);
  }

  createGroup(group: Group){
    this.groupsRef.push(group);
  }

  deleteGroup(group: Group){
    this.af.object('groups' + group.uid).remove();
  }


}
