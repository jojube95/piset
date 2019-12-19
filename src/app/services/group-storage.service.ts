import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Group} from '../model/group';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class GroupStorageService {
  private url = 'http://localhost:5000';
  private socket;

  constructor() {
    this.socket = io(this.url);
  }

  getGroups(){
    this.socket.emit('get-groups', 'need groups');
  }


  observeGroupsFromSocket(): Observable<Group[]>{
    return new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('groups', (data) => {
        observer.next(data);
      });
    });
  }

  deleteGroup(group: Group){
    this.socket.emit('group-delete', group._id);
  }


  createGroup(group: Group){
    this.socket.emit('group-add', group);
  }
}
