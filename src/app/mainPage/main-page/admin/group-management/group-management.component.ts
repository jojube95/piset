import { Component, OnInit } from '@angular/core';
import { GroupStorageService} from '../../../../dao/group-storage.service';
import {NgForm} from '@angular/forms';
import {Group} from '../../../../model/group';
import {Observable} from 'rxjs';

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

  constructor(private groupStorage: GroupStorageService) { }

  ngOnInit() {
    this.groupStorage.getObservableGroups().subscribe(async () => {
      this.loading = await false;

    });
    this.groupsList = this.groupStorage.getObservableGroups();
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
    console.log(group);
    this.groupStorage.deleteGroup(group);
  }

  onClickGroup(group: Group){
    this.currentGroup = group;
  }

}
