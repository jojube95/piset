import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Group} from '../../../../model/group';
import {GroupStorageService} from '../../../../dao/group-storage.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  groupsList: Observable<Group[]>;
  currentGroup: Group = new Group('Selecciona grupo', []);
  add: boolean = false;
  loading: boolean = true;

  constructor(private groupStorage: GroupStorageService) { }

  ngOnInit() {
    this.groupStorage.getObservableGroups().subscribe(async () => {
      this.loading = await false;

    });
    this.groupsList = this.groupStorage.getObservableGroups();
  }

  onGroupSelect(group: Group){
    this.currentGroup = group;
  }

}
