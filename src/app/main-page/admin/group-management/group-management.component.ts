import { Component, OnInit } from '@angular/core';
import {GroupStorageService} from '../../../services/group-storage.service';
import {UserStorageService} from '../../../services/user-storage.service';
import {NgForm} from '@angular/forms';
import {Group} from '../../../model/group';

@Component({
  selector: 'app-group-management',
  templateUrl: './group-management.component.html',
  styleUrls: ['./group-management.component.scss'],
})
export class GroupManagementComponent implements OnInit {
  add: boolean = false;
  loading: boolean = true;

  constructor(public groupStorage: GroupStorageService, public  userStorage: UserStorageService) { }

  ngOnInit() {
    this.loading = false;
  }

  onClickAdd() {
    this.add = true;
  }

  onClickCancel(){
    this.add = false;
  }

  onAddGroup(form: NgForm){
    let group = new Group(null, form.value.name, []);

    console.log(group);

    this.groupStorage.createGroup(group);
  }

  onClickDelete(group: Group){
    this.groupStorage.deleteGroup(group);
  }

  onClickGroup(group: Group){
    this.userStorage.getUsersGroup(group);
  }

}
