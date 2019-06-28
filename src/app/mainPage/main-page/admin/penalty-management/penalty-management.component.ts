import { Component, OnInit } from '@angular/core';
import { PenaltyStorageService} from '../../../../dao/penalty-storage.service';
import { Observable} from 'rxjs';
import { Group} from '../../../../model/group';
import { GroupStorageService} from '../../../../dao/group-storage.service';
import { UserModel} from '../../../../model/userModel';
import { Penalty } from 'src/app/model/penalty';
import { NgForm } from '@angular/forms';
import { TaskStorageService } from 'src/app/dao/task-storage.service';
import { SubTask } from 'src/app/model/subTask';
import { firestore} from 'firebase';

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
  penaltysList: Observable<Penalty[]>;
  subtasksList: Observable<SubTask[]>;

  currentGroup: Group;
  currentUser: UserModel;
  currentFilterDateStart: Date;
  currentFilterDateEnd: Date;
  currentAddPenaltyUser: UserModel;
  currentAddPenaltySubtask: SubTask;
  loadingGroups: boolean = false;
  loadingUsers: boolean = false;

  groupSelected: boolean = false;
  userSelected: boolean = false;
  addPenalty = false;

  constructor(private penaltyStorage: PenaltyStorageService, private groupStorage: GroupStorageService,
              private taskStorage: TaskStorageService) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  ngOnInit() {
    this.groupsList =  this.groupStorage.getObservableGroups();

  }


  onGroupSelect(group: Group){
    this.addPenalty = false;
    this.groupSelected = true;
    this.currentGroup = group;
    this.currentUser = null;
    this.usersList = this.groupStorage.getUsersFromGroup(group);
    this.loadingUsers = false;

    this.penaltysList = this.penaltyStorage.getGroupPenaltys(group);

    this.subtasksList = this.taskStorage.getGroupSubtaks(group);


  }

  onUserSelect(user: UserModel){
    this.userSelected = true;
    this.currentUser = user;
  }

  onAllUserSelect(){
    this.currentUser = new UserModel('', '', 'Todos', '', false);
  }

  onDateFilterChange(value: any){
    let dates = value.split(' ', 3);
    this.currentFilterDateStart = new Date(dates[0]);
    this.currentFilterDateEnd= new Date(dates[2]);
  }

  onClickAddPenalty(){
    this.addPenalty = true;
    this.usersList = this.groupStorage.getUsersFromGroup(this.currentGroup);
  }

  onClickCancelAddPenalty(){
    this.addPenalty = false;
  }

  onClickDeletePenalty(penalty: Penalty){
    this.penaltyStorage.deleteGroupPenalty(penalty);
  }

  onAddPenalty(form: NgForm){
    let penalty = new Penalty(form.value.amount, firestore.Timestamp.fromDate(form.value.date));
    console.log(this.currentGroup);
    console.log(this.currentAddPenaltyUser);
    console.log(this.currentAddPenaltySubtask);
    console.log(penalty);
    this.penaltyStorage.createUserPenalty(this.currentGroup, this.currentAddPenaltyUser, this.currentAddPenaltySubtask, penalty);
  }

  onPenaltySubtaskSelect(subtask: SubTask){
    this.currentAddPenaltySubtask = subtask;
  }

  onPenaltyUserSelect(user: UserModel){
    this.currentAddPenaltyUser = user;
  }



}
