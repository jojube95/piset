import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {map} from 'rxjs/operators';
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

  getUsersFromSocket(): Observable<User[]> {
    return new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('users', (data) => {
        observer.next(data);
      });
    });
  }

  getUsers(group: Group){
    this.socket.emit('get-users', group);
  }

  public getCurrentUser() {
    return this.authService.getCurrentUser();
  }

}
