import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {HttpClient} from '@angular/common/http';
import {AuthService} from "../auth/auth.service";
import {Group} from "../model/group";
import * as io from 'socket.io-client';



@Injectable({
  providedIn: 'root'
})
export class UserStorageService {
  private url = 'http://localhost:5000';
  private socket;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.socket = io(this.url);
  }


  updateUserProfile(user: User) {
    return this.http.post('http://localhost:3000/api/users/update', user).subscribe(response => {
      console.log(response);
    });
  }

  getUsersGroupFromSocket(): Observable<User[]> {
    return new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('users-by-group', (data) => {
        observer.next(data);
      });
    });
  }

  getUsersWithoutGroupFromSocket(): Observable<User[]> {
    return new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('users-without-group', (data) => {
        observer.next(data);
      });
    });
  }

  getUsersGroup(group: Group){
    this.socket.emit('get-users-by-group', group);
  }

  getUsersWithoutGroup(){
    this.socket.emit('get-users-without-group');
  }

  addUserToGroup(user: User, group: Group){
    this.socket.emit('add-user-to-group', {user: user, group: group});
  }

  deleteUserFromGroup(user: User, group: Group){
    this.socket.emit('delete-user-from-group', {user: user, group: group});
  }

  public getCurrentUser() {
    return this.authService.getCurrentUser();
  }

}
