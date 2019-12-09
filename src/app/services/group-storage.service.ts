import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Group} from '../model/group';
import {User} from '../model/user';
import {HttpClient} from "@angular/common/http";
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class GroupStorageService {
  private url = 'http://localhost:5000';
  private socket;

  constructor(private http: HttpClient) {
    this.socket = io(this.url);
  }

  getGroups(){
    this.socket.emit('get-groups', 'need groups');
  }


  getGroupsFromSocket(): Observable<Group[]>{
    return new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('groups', (data) => {
        observer.next(data);
      });
    });
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

  deleteGroup(group: Group){
    this.socket.emit('group-delete', group);
  }


  createGroup(group: Group){
    this.socket.emit('group-add', group);
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

  updateGroup(group: Group){
    // this.firestore.collection('groups').doc(group.id).update(group);
  }



}
