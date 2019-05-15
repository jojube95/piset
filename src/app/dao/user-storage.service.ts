import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Observable} from 'rxjs';
import {UserModel} from '../model/userModel';
import {map} from 'rxjs/operators';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {
  usersRef: AngularFireList<any>;

  usersObservable: Observable<UserModel[]>;

  constructor(private af: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.usersRef = this.af.list('users');
    this.usersObservable = this.usersRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
      )
    );

  }

  getUsersByMail(mail: string) {
    return this.usersRef = this.af.list('/users', ref => ref.equalTo(mail));
  }

  updateUserProfile(user: UserModel) {
    this.af.object('users/' + user.uid)
      .update(user);

  }

  getObservableUsers() {
    return this.usersObservable;
  }

  public getCurrentUser() {
    return this.afAuth.auth.currentUser;
  }

}
