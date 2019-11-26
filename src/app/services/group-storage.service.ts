import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Group} from '../model/group';
import {User} from '../model/user';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GroupStorageService {

  constructor(private http: HttpClient) {
  }

  getObservableGroups(): Observable<Group[]>{
    return this.http.get<{message: string, groups: any}>('http://localhost:3000/api/groups/get').pipe(map((groupData) =>{
      return groupData.groups.map((group) => {
        return {
          id: group.id,
          name: group.name,
          users: group.users
        }
      });
    }));
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

  addUserToGroup(user: User, group: Group){
    /*
    user.groupId = group.id;
    this.firestore.collection('users').doc(user.id).update(user);
    */
  }

  getUsersFromGroup(group: Group): Observable<User[]>{
    /*
    return this.firestore.collection('users', ref => ref.where('groupId', '==', group.id)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as User;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );*/
    return null;
  }

  deleteUserFromGroup(user: User, group: Group){
    this.http.post('http://localhost:3000/api/groups/deleteUser', {user: user, group: group});
  }



}
