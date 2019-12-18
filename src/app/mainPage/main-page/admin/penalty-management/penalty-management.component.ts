import { Component, OnInit } from '@angular/core';
import { PenaltyStorageService} from '../../../../services/penalty-storage.service';
import { Observable} from 'rxjs';
import { Group} from '../../../../model/group';
import { GroupStorageService} from '../../../../services/group-storage.service';
import { User} from '../../../../model/user';
import { Penalty } from 'src/app/model/penalty';
import { NgForm } from '@angular/forms';
import { TaskStorageService } from 'src/app/services/task-storage.service';
import { SubTask } from 'src/app/model/subTask';
import {SubtaskStorageService} from "../../../../services/subtask-storage.service";
import {UserStorageService} from "../../../../services/user-storage.service";

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
  usersList: Observable<User[]>;
  penaltysList: Observable<Penalty[]>;
  subtasksList: Observable<SubTask[]>;

  currentGroup: Group;
  currentUser: User;
  currentFilterDateStart: Date;
  currentFilterDateEnd: Date;
  currentAddPenaltyUser: User;
  currentAddPenaltySubtask: SubTask;
  loadingGroups: boolean = false;
  loadingUsers: boolean = false;

  groupSelected: boolean = false;
  userSelected: boolean = false;
  addPenalty = false;

  constructor(private penaltyStorage: PenaltyStorageService, private groupStorage: GroupStorageService, private userStorage: UserStorageService,
              private taskStorage: TaskStorageService, private subtaskStorage: SubtaskStorageService) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];

    this.currentFilterDateStart = this.bsValue;
    this.currentFilterDateEnd = this.maxDate;

  }

  ngOnInit() {
    //Read from socket
    this.groupsList = this.groupStorage.observeGroupsFromSocket();
    this.usersList = this.userStorage.observeUsersGroupFromSocket();
    this.subtasksList = this.subtaskStorage.observeGroupSubtasksFromSocket();
    this.penaltysList = this.penaltyStorage.observeFilteredPenaltysFromSocket();
    //Tell socket that I need data
    this.groupStorage.getGroups();
  }


  onGroupSelect(group: Group){
    this.addPenalty = false;
    this.groupSelected = true;
    this.currentGroup = group;
    this.currentUser = null;
    this.userStorage.getUsersGroup(group);
    this.loadingUsers = false;

    this.penaltyStorage.getFilteredPenalties(this.currentGroup);
  }

  onUserSelect(user: User){
    this.userSelected = true;
    this.currentUser = user;

  }

  onAllUserSelect(){
    this.currentUser = new User('', '', 'Todos', '', false);
  }

  onDateFilterChange(value: any){
    let dates = value.split(' ', 3);

    let dateStart = dates[0].split('/');
    let dateEnd = dates[2].split('/');

    this.currentFilterDateStart = new Date(dateStart[1] + '/' + dateStart[0] + '/' + dateStart[2]);
    this.currentFilterDateEnd = new Date(dateEnd[1] + '/' + dateEnd[0] + '/' + dateEnd[2]);
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
    this.penaltyStorage.createPenalty(this.currentGroup, this.currentAddPenaltyUser, this.currentAddPenaltySubtask, penalty);
  }

  onPenaltySubtaskSelect(subtask: SubTask){
    this.currentAddPenaltySubtask = subtask;
  }

  onPenaltyUserSelect(user: User){
    this.currentAddPenaltyUser = user;
  }

}
