import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Group} from '../../../model/group';
import {UserModel} from '../../../model/userModel';
import {Penalty} from '../../../model/penalty';
import {SubTask} from '../../../model/subTask';
import {PenaltyStorageService} from '../../../dao/penalty-storage.service';
import {GroupStorageService} from '../../../dao/group-storage.service';
import {TaskStorageService} from '../../../dao/task-storage.service';
import {NgForm} from '@angular/forms';
import {firestore} from 'firebase';
import {UserStorageService} from '../../../dao/user-storage.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  usersList: Observable<UserModel[]>;
  subtasksList: Observable<SubTask[]>;

  currentUser: UserModel;
  loadingGroups: boolean = false;

  userSelected: boolean = false;

  constructor(private penaltyStorage: PenaltyStorageService, private userStorage: UserStorageService,
              private taskStorage: TaskStorageService) {

  }

  ngOnInit() {
    this.usersList =  this.userStorage.getObservableUsers();
  }

  onUserSelect(user: UserModel){
    this.userSelected = true;
    this.currentUser = null;

    this.subtasksList = this.taskStorage.getUserSubTasks(user);


  }


}
