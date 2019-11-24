import { Component, OnInit } from '@angular/core';
import { GroupStorageService} from '../../../../services/group-storage.service';
import {NgForm} from '@angular/forms';
import {Group} from '../../../../model/group';
import {Observable} from 'rxjs';
import { User } from 'src/app/model/user';

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

  constructor(private groupStorage: GroupStorageService) { }

  ngOnInit() {
    this.groupStorage.getObservableGroups().subscribe(async () => {
      this.groupsList = await this.groupStorage.getObservableGroups();
      this.loading = await false;
      

    });
    
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
    this.currentUsers = this.groupStorage.getUsersFromGroup(group);
       
  }

}
