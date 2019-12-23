import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Group} from '../../../model/group';
import {GroupStorageService} from '../../../services/group-storage.service';
import {User} from '../../../model/user';
import {UserStorageService} from '../../../services/user-storage.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  groupsList: Observable<Group[]>;
  usersWithoutGroup: Observable<User[]> = new Observable();
  currentGroup: Group = new Group('Selecciona grupo', []);
  currentUser: User = new User('', '', 'Selecciona usuario', '', false);
  usersGroup: Observable<User[]> = new Observable();

  userSelected: boolean;
  groupSelected: boolean;

  constructor(private groupStorage: GroupStorageService, private userStorage: UserStorageService) { }

  ngOnInit() {
    //Read groups from socket
    this.groupsList = this.groupStorage.observeGroupsFromSocket();
    this.usersGroup = this.userStorage.observeUsersGroupFromSocket();
    this.usersWithoutGroup = this.userStorage.observeUsersWithoutGroupFromSocket();
    //Tell socket that I need data
    this.groupStorage.getGroups();
    this.userStorage.getUsersWithoutGroup();

    //Set control variables
    this.userSelected = false;
    this.groupSelected = false;

  }

  onGroupSelect(group: Group){
    this.currentGroup = group;
    this.userStorage.getUsersGroup(group);
    this.currentUser = new User('', '', 'Selecciona usuario', '', false);
    this.groupSelected = true;
    this.userSelected = false;
  }

  onUserSelect(user: User){
    this.currentUser = user;
    this.userSelected = true;
  }

  onAddUser(){
    this.userStorage.addUserToGroup(this.currentUser, this.currentGroup);
    this.currentUser = new User('', '', 'Selecciona usuario', '', false);
    this.userSelected = false;
  }

  onClickDelete(user: User){
    this.userStorage.deleteUserFromGroup(user, this.currentGroup);
  }

}
