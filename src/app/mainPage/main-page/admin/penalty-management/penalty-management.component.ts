import { Component, OnInit } from '@angular/core';
import {PenaltyStorageService} from '../../../../dao/penalty-storage.service';
import {Observable} from 'rxjs';
import {Group} from '../../../../model/group';
import {GroupStorageService} from '../../../../dao/group-storage.service';
import {UserModel} from '../../../../model/userModel';
import { Penalty } from 'src/app/model/penalty';
import { NgForm } from '@angular/forms';
import { TaskStorageService } from 'src/app/dao/task-storage.service';
import { SubTask } from 'src/app/model/subTask';
import { Task } from 'src/app/model/task';
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
  subtasksList: any[];

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
    this.groupStorage.getObservableGroups().subscribe(async () => {
      this.groupsList =  await this.groupStorage.getObservableGroups();
      this.loadingGroups = await false;
    });
  }


  onGroupSelect(group: Group){
    this.addPenalty = false;
    this.groupSelected = true;
    this.currentGroup = group;
    this.currentUser = null;
    this.groupStorage.getUsersFromGroup(group).subscribe(async () => {
      this.usersList =  await this.groupStorage.getUsersFromGroup(group);
      this.loadingUsers = await false;

      // await this.usersList.subscribe(async next => {
      //   await console.log(next);
      // });
    });



    this.penaltyStorage.getGroupPenaltys(group).subscribe(async () => {
      this.penaltysList =  await this.penaltyStorage.getGroupPenaltys(group);
      // this.loadingUsers = await false;
    });

    this.taskStorage.getGroupTasks(group).subscribe(async next => {
      next.forEach(nextTask => {
        let taskAux = new Task('', [], nextTask.key);
        this.taskStorage.getSubtasks(group, taskAux).subscribe(async nextSubtaks => {
          this.subtasksList = await nextSubtaks;

        });

     });


    });


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
  }

  onClickCancelAddPenalty(){
    this.addPenalty = false;
  }

  onClickDeletePenalty(penalty: Penalty){
    this.penaltyStorage.deleteGroupPenalty(this.currentGroup, penalty);
  }

  onAddPenalty(form: NgForm){
    let penalty = new Penalty(form.value.amount, firestore.Timestamp.fromDate(form.value.date) , this.currentAddPenaltyUser,
                              this.currentAddPenaltySubtask);
    this.penaltyStorage.createUserPenalty(this.currentGroup, penalty);
  }

  onPenaltySubtaskSelect(subtask: SubTask){
    this.currentAddPenaltySubtask = subtask;
  }

  onPenaltyUserSelect(user: UserModel){
    this.currentAddPenaltyUser = user;
  }



}
