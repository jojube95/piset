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
  currentGroup: Group = null;
  groupSelected: boolean = false;

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
    this.groupStorage.createGroup(group);

  }

  onClickDelete(){
    if(this.currentGroup != null){
      this.groupStorage.deleteGroup(this.currentGroup);
    }
  }

  onGroupSelect(event){
    let group = event.detail.value;

    if(this.currentGroup == group){
      this.groupSelected = false;
    }
    else{
      this.groupSelected = true;
      this.userStorage.getUsersGroup(group);
    }
    this.currentGroup = group;
  }

}
