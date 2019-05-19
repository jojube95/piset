import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Observable} from 'rxjs';
import {UserModel} from '../model/userModel';
import {map} from 'rxjs/operators';
import {AngularFireAuth} from 'angularfire2/auth';
import { Group } from '../model/group';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor(private af: AngularFireDatabase, private afAuth: AngularFireAuth) {
  }

  getUsersByMail(mail: string) {
    return this.af.list('/users', ref => ref.equalTo(mail)).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
      )
    );
  }

  updateUserProfile(user: UserModel) {
    this.af.object('users/' + user.key).update(user);
  }

  getObservableUsers(): Observable<UserModel[]> {
    return <Observable<UserModel[]>> this.af.list('users').snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
      )
    );
  }


  public getCurrentUser() {
    return this.afAuth.auth.currentUser;
  }

  public deleteUserFromGroup(user: UserModel, group: Group){
    this.af.object('groups/' + group.key + '/users/' + user.key).remove();
  }

  public addUser(user: UserModel){
    this.af.list('users').push(user);
  }




}
