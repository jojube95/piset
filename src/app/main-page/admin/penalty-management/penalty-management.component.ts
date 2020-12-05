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
  minDate = new Date();
  maxDate = new Date();

  subtasksList: Observable<SubTask[]>;

  currentGroup: Group;
  currentUser: User;
  currentDate: String;

  currentAddPenaltyUser: User;
  currentAddPenaltySubtask: SubTask;
  loadingGroups: boolean = false;
  loadingUsers: boolean = false;

  groupSelected: boolean = false;
  userSelected: boolean = false;
  addPenalty = false;

  constructor(public penaltyStorage: PenaltyStorageService, public groupStorage: GroupStorageService, public userStorage: UserStorageService,
              public taskStorage: TaskStorageService, public subtaskStorage: SubtaskStorageService) {

  }

  ngOnInit() {
    this.currentGroup = new Group(null, 'Selecciona grupo', null);
    this.currentUser = new User('', '', 'Selecciona usuario', '', false);
    this.currentDate = new Date().toISOString().substr(0, 10);

    console.log(this.currentDate);
  }

  onGroupSelect(event){
    let group = event.detail.value;
    this.addPenalty = false;
    this.groupSelected = true;
    this.currentGroup = group;
    this.userStorage.getUsersGroup(group);
    this.loadingUsers = false;

    this.penaltyStorage.getFilteredPenalties(this.currentGroup);
  }

  onUserSelect(event){
    let user = event.detail.value;
    this.userSelected = true;
    this.currentUser = user;

  }

  onAllUserSelect(){
    this.currentUser = new User('', '', 'Todos', '', false);
  }

  onDateFilterChange(event){
    let date = event.detail.value;
    console.log(date);
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
    this.penaltyStorage.createPenalty(this.currentGroup, penalty);
  }

  onPenaltySubtaskSelect(subtask: SubTask){
    this.currentAddPenaltySubtask = subtask;
  }

  onPenaltyUserSelect(user: User){
    this.currentAddPenaltyUser = user;
  }

}
