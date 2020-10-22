import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {User} from '../model/user';
import {HttpClient} from '@angular/common/http';
import {AuthService} from "../auth/auth.service";
import {Group} from "../model/group";
import {List} from "immutable";



@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  public _usersGroup: BehaviorSubject<List<User>> = new BehaviorSubject(List([]));
  public _usersWithoutGroup: BehaviorSubject<List<User>> = new BehaviorSubject(List([]));

  constructor(private http: HttpClient, private authService: AuthService) {}


  updateUserProfile(user: User) {
    return this.http.post('http://localhost:3000/api/users/update', user).subscribe(response => {
      console.log(response);
    });
  }


  getUsersGroup(group: Group) {
    return this.http.get<{message: string, users: any}>('http://localhost:3000/api/users/getByGroup' + group._id).subscribe(
      res => {
        let users = (<Object[]>res.users).map((user: any) =>
          new User(user.mail, user.password, user.name, user.secondName, user.admin, user._id, user.groupId));

        this._usersGroup.next(List(users));
      },
      err => console.log("Error retrieving Todos")
    );
  }

  getUsersWithoutGroup() {
    return this.http.get<{message: string, users: any}>('http://localhost:3000/api/users/getWithoutGroup').subscribe(
      res => {
        let users = (<Object[]>res.users).map((user: any) =>
          new User(user.mail, user.password, user.name, user.secondName, user.admin, user._id, user.groupId));

        this._usersWithoutGroup.next(List(users));
      },
      err => console.log("Error retrieving Todos")
    );
  }

  addUserToGroup(addedUser: User, group: Group){
    this.http.post('http://localhost:3000/api/users/addUserToGroup', {userId: addedUser._id, groupId: group._id}).subscribe(response => {
      //Add user to _usersGroup and push
      this._usersGroup.next(this._usersGroup.getValue().push(addedUser));

      //Delete user from group and push to the _usersWithoutGroup
      let usersWithoutGroup: List<User> = this._usersWithoutGroup.getValue();
      let index = usersWithoutGroup.findIndex((user) => user._id === addedUser._id);
      this._usersWithoutGroup.next(usersWithoutGroup.delete(index));
    });
  }

  deleteUserFromGroup(deletedUser: User, group: Group){
    this.http.post('http://localhost:3000/api/users/deleteUserFromGroup', {userId: deletedUser._id, groupId: group._id}).subscribe(response => {
      //Delete user from group and push to the _usersGroup
      let usersGroup: List<User> = this._usersGroup.getValue();
      let index = usersGroup.findIndex((user) => user._id === deletedUser._id);
      this._usersGroup.next(usersGroup.delete(index));

      //Add user to _usersWithoutGroup and push
      this._usersWithoutGroup.next(this._usersWithoutGroup.getValue().push(deletedUser));
    });
  }

  public getCurrentUser() {
    return this.authService.getCurrentUser();
  }

}
