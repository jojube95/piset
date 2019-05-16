import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Group} from '../../../../model/group';
import {GroupStorageService} from '../../../../dao/group-storage.service';
import {UserModel} from '../../../../model/userModel';
import {UserStorageService} from '../../../../dao/user-storage.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  groupsList: Observable<Group[]>;
  usersWithoutGroup: Observable<UserModel[]> = new Observable();
  currentGroup: Group = new Group('Selecciona grupo', []);
  currentUser: UserModel = new UserModel('', '', 'Selecciona usuario', '', false);
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
  }

  onUserSelect(user: UserModel){
    this.currentUser = user;
  }

  onAddUser(){
    this.groupStorage.addUserToGroup(this.currentUser, this.currentGroup);
  }

}
