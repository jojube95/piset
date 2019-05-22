import { Component, OnInit } from '@angular/core';
import {PenaltyStorageService} from '../../../../dao/penalty-storage.service';
import {Observable} from 'rxjs';
import {Group} from '../../../../model/group';
import {GroupStorageService} from '../../../../dao/group-storage.service';
import {UserModel} from '../../../../model/userModel';

@Component({
  selector: 'app-penalty-management',
  templateUrl: './penalty-management.component.html',
  styleUrls: ['./penalty-management.component.css']
})
export class PenaltyManagementComponent implements OnInit {
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();

  groupsList: Observable<Group[]>;
  usersList: Observable<UserModel[]>;

  currentGroup: Group = new Group('Selecciona grupo', []);
  currentUser: UserModel = new UserModel('', '', 'Selecciona usuario', '', false);

  loadingGroups: boolean = false;
  loadingUsers: boolean = false;

  groupSelected: boolean = false;
  userSelected: boolean = false;

  constructor(private penaltyStorage: PenaltyStorageService, private groupStorage: GroupStorageService) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  ngOnInit() {
    this.groupStorage.getObservableGroups().subscribe(async () => {
      this.groupsList =  await this.groupStorage.getObservableGroups();
      this.loadingGroups = await false;
    });
  }


  onGroupSelect(group: Group){
    this.groupSelected = true;
    this.currentGroup = group;
    this.currentUser = new UserModel('', '', 'Selecciona usuario', '', false);

    this.groupStorage.getUsersFromGroup(group).subscribe(async () => {
      this.usersList =  await this.groupStorage.getUsersFromGroup(group);
      this.loadingUsers = await false;
    });

  }

  onUserSelect(user: UserModel){
    this.userSelected = true;
    this.currentUser = user;
  }



}
