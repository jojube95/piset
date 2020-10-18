import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {AuthService} from "../auth/auth.service";
import {Group} from "../model/group";



@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor(private http: HttpClient, private authService: AuthService) {}


  updateUserProfile(user: User) {
    return this.http.post('http://localhost:3000/api/users/update', user).subscribe(response => {
      console.log(response);
    });
  }


  getUsersGroup(group: Group): Observable<User[]> {
    return this.http.get<{message: string, users: any}>('http://localhost:3000/api/users/getByGroup' + group._id).pipe(map((userData) =>{
      return userData.users.map((user) => {
        return {
          mail: user.mail,
          password: user.password,
          name: user.name,
          secondName: user.secondName,
          admin: user.admin,
          id: user.id,
          groupId: user.groupId || null
        }
      });
    }));
  }

  getUsersWithoutGroup(): Observable<User[]> {
    return this.http.get<{message: string, users: any}>('http://localhost:3000/api/users/getWithoutGroup').pipe(map((userData) =>{
      return userData.users.map((user) => {
        return {
          mail: user.mail,
          password: user.password,
          name: user.name,
          secondName: user.secondName,
          admin: user.admin,
          id: user.id,
          groupId: user.groupId || null
        }
      });
    }));
  }

  addUserToGroup(user: User, group: Group){
    this.http.post('http://localhost:3000/api/users/addUserToGroup', {userId: user._id, groupId: group._id}).subscribe(response => {
      console.log(response);
    });;
  }

  deleteUserFromGroup(user: User, group: Group){
    this.http.post('http://localhost:3000/api/users/deleteUserFromGroup', {userId: user._id, groupId: group._id}).subscribe(response => {
      console.log(response);
    });
  }

  public getCurrentUser() {
    return this.authService.getCurrentUser();
  }

}
