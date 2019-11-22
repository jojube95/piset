import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Group} from '../model/group';
import {UserModel} from '../model/userModel';

@Injectable({
  providedIn: 'root'
})
export class GroupStorageService {
  constructor() {
  }

  getObservableGroups(): Observable<Group[]>{
    /*
    return this.firestore.collection('groups').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Group;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    */
    return null;
  }

  updateGroup(group: Group){
    // this.firestore.collection('groups').doc(group.id).update(group);
  }

  createGroup(group: Group){
    /*
    this.firestore.collection('groups').add({
      name: group.name
    });*/
  }

  deleteGroup(group: Group){
    /*
    this.firestore.collection('groups').doc(group.id).delete();
    */
  }

  addUserToGroup(user: UserModel, group: Group){
    /*
    user.groupId = group.id;
    this.firestore.collection('users').doc(user.id).update(user);
    */
  }

  getUsersFromGroup(group: Group): Observable<UserModel[]>{
    /*
    return this.firestore.collection('users', ref => ref.where('groupId', '==', group.id)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as UserModel;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );*/
    return null;
  }



}
