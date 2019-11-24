import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../../model/user';
import {SubTask} from '../../../model/subTask';
import {PenaltyStorageService} from '../../../services/penalty-storage.service';
import {TaskStorageService} from '../../../services/task-storage.service';
import {UserStorageService} from '../../../services/user-storage.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  usersList: Observable<User[]>;
  subtasksList: Observable<SubTask[]>;

  currentUser: User;
  loadingUsers: boolean = true;

  userSelected: boolean = false;

  constructor(private penaltyStorage: PenaltyStorageService, private userStorage: UserStorageService,
              private taskStorage: TaskStorageService) {

  }

  ngOnInit() {
    this.usersList =  this.userStorage.getObservableUsers();
    this.loadingUsers = false;
  }

  onUserSelect(user: User){
    this.userSelected = true;
    this.currentUser = null;

    this.subtasksList = this.taskStorage.getUserSubTasks(user);


  }


}
