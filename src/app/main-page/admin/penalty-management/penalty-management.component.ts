import { Component, OnInit } from '@angular/core';
import {Group} from '../../../model/group';
import {SubtaskStorageService} from '../../../services/subtask-storage.service';
import {TaskStorageService} from '../../../services/task-storage.service';
import {UserStorageService} from '../../../services/user-storage.service';
import {GroupStorageService} from '../../../services/group-storage.service';
import {Observable} from 'rxjs';
import {SubTask} from '../../../model/subTask';
import {User} from '../../../model/user';
import {PenaltyStorageService} from '../../../services/penalty-storage.service';
import {Penalty} from '../../../model/penalty';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-penalty-management',
  templateUrl: './penalty-management.component.html',
  styleUrls: ['./penalty-management.component.scss'],
})
export class PenaltyManagementComponent implements OnInit {
  minDate: Date;
  maxDate: Date;

  currentGroup: Group;
  currentUser: User;
  currentDate: Date;

  currentAddPenaltyUser: User;
  currentAddPenaltySubtask: SubTask;
  loadingGroups: boolean = false;
  loadingUsers: boolean = false;

  groupSelected: boolean = false;
  userSelected: boolean = false;
  addPenalty = false;

  constructor(public penaltyStorage: PenaltyStorageService, public groupStorage: GroupStorageService, public userStorage: UserStorageService,
              public taskStorage: TaskStorageService, public subtaskStorage: SubtaskStorageService) {
    this.currentGroup = new Group(null, 'Selecciona grupo', null);
    this.currentUser = new User('', '', 'Todos', '', false);

    this.currentDate = new Date();

    this.maxDate = new Date(this.currentDate.getFullYear() + 5, 0, 0);
    this.minDate = new Date(this.currentDate.getFullYear() - 5, 0, 1);
  }

  ngOnInit() {

  }

  onGroupSelect(event){
    let group = event.detail.value;
    this.addPenalty = false;
    this.groupSelected = true;
    this.currentGroup = group;
    this.userStorage.getUsersGroup(group);
    this.subtaskStorage.getGroupSubtasks(group);
    this.loadingUsers = false;

    this.penaltyStorage.getFilteredPenalties(this.currentGroup);
  }

  onUserSelect(event){
    let user = event.detail.value;

    if(user == 'All'){
      this.currentUser = new User('', '', 'Todos', '', false);
    }
    else{
      this.userSelected = true;
      this.currentUser = user;
    }
  }

  onDateFilterChange(event){
    let date = event.detail.value;
    this.currentDate = new Date(date);
  }

  onClickAddPenalty(){
    this.addPenalty = true;
    this.userStorage.getUsersGroup(this.currentGroup);
    this.subtaskStorage.getGroupSubtasks(this.currentGroup);
  }

  onClickCancelAddPenalty(){
    this.addPenalty = false;
  }

  onClickDeletePenalty(penalty: Penalty){
    this.penaltyStorage.deleteGroupPenalty(penalty);
  }

  onAddPenalty(form: NgForm){
    let penalty = new Penalty(form.value.amount, new Date(form.value.date), this.currentAddPenaltyUser.name,
        this.currentAddPenaltySubtask.name, this.currentAddPenaltyUser._id, this.currentGroup._id, this.currentAddPenaltySubtask._id);
    this.penaltyStorage.createPenalty(penalty);
  }

  onPenaltySubtaskSelect(event){
    let subtask = event.detail.value;
    this.currentAddPenaltySubtask = subtask;
  }

  onPenaltyUserSelect(event){
    let user = event.detail.value;
    this.currentAddPenaltyUser = user;
  }

}
