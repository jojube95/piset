import { Component, OnInit } from '@angular/core';
import {GroupStorageService} from '../../../services/group-storage.service';
import {UserStorageService} from '../../../services/user-storage.service';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
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
  form: FormGroup;

  constructor(public groupStorage: GroupStorageService, public  userStorage: UserStorageService, private fb: FormBuilder) { }

  ngOnInit() {
    this.loading = false;

    this.form = this.fb.group({
      name: ['', [
        Validators.required
      ]]
    })
  }

  onClickAdd() {
    this.add = true;
  }

  onClickCancel(){
    this.add = false;
  }

  addGroup(){
    if(this.form.valid){
      let group = new Group(null, this.form.value.name, []);
      this.groupStorage.createGroup(group);
    }
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
