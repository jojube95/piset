import { Injectable } from '@angular/core';
import {AngularFirestore } from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {UserModel} from '../model/userModel';
import {map} from 'rxjs/operators';
import {AngularFireAuth} from 'angularfire2/auth';
import { Group } from '../model/group';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) {
  }


  updateUserProfile(user: UserModel) {
    this.firestore.collection('users').doc(user.id).update(user);
  }

  getObservableUsers(): Observable<UserModel[]> {
    return this.firestore.collection('users').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as UserModel;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

  }

  public getCurrentUser() {
    return this.afAuth.auth.currentUser;
  }

  public deleteUserFromGroup(user: UserModel, group: Group){
    user.groupId = null;
    this.firestore.collection('users').doc(user.id).update(user);
  }

  public addUser(user: UserModel){
    this.firestore.collection('users').add({
      mail: user.mail,
      password: user.password,
      name: user.name,
      secondName: user.secondName,
      admin: user.admin
    });

  }




}
