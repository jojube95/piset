import { Component, OnInit } from '@angular/core';
import { GroupStorageService} from '../../../../dao/group-storage.service';
import {AngularFireList} from 'angularfire2/database';

@Component({
  selector: 'app-group-management',
  templateUrl: './group-management.component.html',
  styleUrls: ['./group-management.component.css']
})
export class GroupManagementComponent implements OnInit {
  groupsList: AngularFireList<any>;

  constructor(private groupStorage: GroupStorageService) { }

  ngOnInit() {
    this.groupsList = this.groupStorage.getGroupsFireList();
  }

}
