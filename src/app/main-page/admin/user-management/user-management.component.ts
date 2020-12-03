import { Component, OnInit } from '@angular/core';
import {UserStorageService} from '../../../services/user-storage.service';
import {GroupStorageService} from '../../../services/group-storage.service';
import {Group} from '../../../model/group';
import {User} from '../../../model/user';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  currentGroup: Group = new Group(null, 'Selecciona grupo', []);
  currentUser: User = new User('', '', 'Selecciona usuario', '', false);

  userSelected: boolean;
  groupSelected: boolean;

  constructor(public groupStorage: GroupStorageService, public userStorage: UserStorageService) { }

  ngOnInit() {
    //Set control variables
    this.userSelected = false;
    this.groupSelected = false;
  }

  onGroupSelect(event){
    let group = event.detail.value;
    this.currentGroup = group;
    this.userStorage.getUsersGroup(group);
    this.currentUser = new User('', '', 'Selecciona usuario', '', false);
    this.userStorage.getUsersWithoutGroup();
    this.groupSelected = true;
    this.userSelected = false;
  }

  onUserSelect(event){
    let user = event.detail.value;

    if(this.currentUser == user){
      this.userSelected = false;
    }
    else{
      this.userSelected = true;
    }
    this.currentUser = user;
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
