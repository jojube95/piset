import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {UserModel} from '../../../model/userModel';
import {SubTask} from '../../../model/subTask';
import {PenaltyStorageService} from '../../../dao/penalty-storage.service';
import {TaskStorageService} from '../../../dao/task-storage.service';
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
  loadingUsers: boolean = true;

  userSelected: boolean = false;

  constructor(private penaltyStorage: PenaltyStorageService, private userStorage: UserStorageService,
              private taskStorage: TaskStorageService) {

  }

  ngOnInit() {
    this.usersList =  this.userStorage.getObservableUsers();
    this.loadingUsers = false;
  }

  onUserSelect(user: UserModel){
    this.userSelected = true;
    this.currentUser = null;

    this.subtasksList = this.taskStorage.getUserSubTasks(user);


  }


}
