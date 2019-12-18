import { Component, OnInit } from '@angular/core';
import { GroupStorageService} from '../../../../services/group-storage.service';
import {NgForm} from '@angular/forms';
import {Group} from '../../../../model/group';
import {Observable} from 'rxjs';
import { User } from 'src/app/model/user';
import {UserStorageService} from "../../../../services/user-storage.service";

@Component({
  selector: 'app-group-management',
  templateUrl: './group-management.component.html',
  styleUrls: ['./group-management.component.css']
})
export class GroupManagementComponent implements OnInit {
  groupsList: Observable<Group[]>;

  currentGroup: Group = new Group('', []);
  add: boolean = false;
  loading: boolean = true;
  currentUsers: Observable<User[]>;

  constructor(private groupStorage: GroupStorageService, private  userStorage: UserStorageService) { }

  ngOnInit() {
    //Read from socket
    this.groupsList = this.groupStorage.observeGroupsFromSocket();
    //Read users from socket
    this.currentUsers = this.userStorage.observeUsersGroupFromSocket();

    //Tell socket that I need data
    this.groupStorage.getGroups();

    this.loading = false;

  }

  onClickAdd() {
    this.add = true;
  }

  onClickCancel(){
    this.add = false;
  }

  onAddGroup(form: NgForm){
    let group = new Group(form.value.name, []);

    this.groupStorage.createGroup(group);

  }

  onClickDelete(group: Group){
    this.groupStorage.deleteGroup(group);
  }

  onClickGroup(group: Group){
    this.userStorage.getUsersGroup(group);
       
  }

}
