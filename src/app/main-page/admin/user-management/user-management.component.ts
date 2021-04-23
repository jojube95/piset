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
  currentGroup: Group = new Group('Selecciona grupo');
  currentUser: User = new User('', '', 'Selecciona usuario', '', false, [], []);
  currentAddUser: User = new User('', '', 'Selecciona usuario', '', false, [], []);

  userSelected: boolean;
  addUserSelected: boolean;
  groupSelected: boolean;

  addGroupClicked: boolean;
  updateGroupClicked: boolean;

  constructor(public groupStorage: GroupStorageService, public userStorage: UserStorageService) { }

  ngOnInit() {
    // Set control variables
    this.addUserSelected = false;
    this.userSelected = false;
    this.groupSelected = false;
    this.addGroupClicked = false;
    this.updateGroupClicked = false;
  }

  onGroupSelect(event){
    const group = event.detail.value;
    this.currentGroup = group;
    this.userStorage.getUsersGroup(group);
    this.currentUser = new User('', '', 'Selecciona usuario', '', false, [], []);
    this.currentAddUser = new User('', '', 'Selecciona usuario', '', false, [], []);
    this.userStorage.getUsersWithoutGroup(group);
    this.groupSelected = true;
    this.addGroupClicked = false;
    this.updateGroupClicked = false;
    this.addUserSelected = false;
    this.userSelected = false;

  }

  onUserSelect(event){
    if (this.currentUser === event.detail.value){
      this.userSelected = false;
    }
    else{
      this.userSelected = true;
    }
    this.currentUser = event.detail.value;
  }

  onAddUserSelect(event){
    const user = event.detail.value;
    if (this.currentAddUser === user){
      this.addUserSelected = false;
    }
    else{
      this.addUserSelected = true;
    }
    this.currentAddUser = user;
  }

  onAddUser(){
    this.userStorage.addUserToGroup(this.currentUser, this.currentGroup);
    this.currentUser = new User('', '', 'Selecciona usuario', '', false, [], []);
    this.addUserSelected = false;
  }

  onClickDelete(user: User){
    this.userStorage.deleteUserFromGroup(user, this.currentGroup);
  }

  onClickAddGroup(){
    this.addGroupClicked = true;
    this.updateGroupClicked = false;
  }

  onClickUpdateGroup(){
    this.addGroupClicked = false;
    this.updateGroupClicked = true;
  }

  onClickDeleteGroup(){
    if (this.currentGroup._id != null){
      this.groupStorage.deleteGroup(this.currentGroup);
      this.currentGroup = new Group('Selecciona grupo');
      this.addUserSelected = false;
      this.groupSelected = false;
      this.addGroupClicked = false;
      this.updateGroupClicked = false;
    }
  }
}
