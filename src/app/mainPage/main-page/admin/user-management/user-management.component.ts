import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Group} from '../../../../model/group';
import {GroupStorageService} from '../../../../dao/group-storage.service';
import {User} from '../../../../model/user';
import {UserStorageService} from '../../../../dao/user-storage.service';

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
    this.groupStorage.getObservableGroups().subscribe(async () => {
      this.groupsList =  await this.groupStorage.getObservableGroups();
      this.loadingGroup = await false;
    });
    this.userStorage.getObservableUsers().subscribe(async () => {
      this.usersWithoutGroup = await this.userStorage.getObservableUsers();
      this.loadingUsers = await false;

    });

  }

  onGroupSelect(group: Group){
    this.currentGroup = group;
    this.currentUsers = this.groupStorage.getUsersFromGroup(group);
  }

  onUserSelect(user: User){
    this.currentUser = user;
  }

  onAddUser(){
    this.groupStorage.addUserToGroup(this.currentUser, this.currentGroup);
  }

  onClickDelete(user: User){
    this.userStorage.deleteUserFromGroup(user, this.currentGroup);
  }

  

}
