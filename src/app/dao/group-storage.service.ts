import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database'
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { UserStorageService} from './user-storage.service';
import {Group} from '../model/group';
import {UserModel} from '../model/userModel';

@Injectable({
  providedIn: 'root'
})
export class GroupStorageService {
  groupsRef: AngularFireList<Group>;

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
    this.af.object('groups/' + group.key).update(group);
  }

  createGroup(groupObj: Group){
    groupObj.users.push(new UserModel('test@test.com', 'testtest', 'testname', 'testsecond', false));
    groupObj.users.push(new UserModel('test2@test.com', 'testtest2', 'testname2', 'testsecond2', false));
    this.groupsRef.push(groupObj);
  }

  deleteGroup(group: Group){
    this.af.object('groups/' + group.key).remove();
  }

  addUserToGroup(user: UserModel, group: Group){
    this.af.database.ref().child('groups/' + group.key + '/users/' + user.key).set(user);
  }

  getUsersFromGroup(group: Group) {
    return this.af.list('groups/' + group.key + '/users');
  }




}
