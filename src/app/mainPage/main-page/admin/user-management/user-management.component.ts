import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Group} from '../../../../model/group';
import {GroupStorageService} from '../../../../services/group-storage.service';
import {User} from '../../../../model/user';
import {UserStorageService} from '../../../../services/user-storage.service';

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
  currentUsers: Observable<User[]>;
  loadingGroup: boolean = true;
  loadingUsers: boolean = true;

  constructor(private groupStorage: GroupStorageService, private userStorage: UserStorageService) { }

  ngOnInit() {
    //Read groups from socket
    this.groupsList = this.groupStorage.getGroupsFromSocket();
    this.currentUsers = this.userStorage.getUsersFromSocket();
    //Tell socket that I need data
    this.groupStorage.getGroups();

    this.loadingGroup = false;
    this.loadingUsers = false;


  }

  onGroupSelect(group: Group){
    this.currentGroup = group;
    this.userStorage.getUsers(group);
  }

  onUserSelect(user: User){
    this.currentUser = user;
  }

  onAddUser(){
    this.groupStorage.addUserToGroup(this.currentUser, this.currentGroup);
  }

  onClickDelete(user: User){
    this.groupStorage.deleteUserFromGroup(user, this.currentGroup);
  }

  

}
