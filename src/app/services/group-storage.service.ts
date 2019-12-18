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
