import { Component, OnInit } from '@angular/core';
import {Group} from '../../model/group';
import {User} from '../../model/user';
import {PenaltyStorageService} from '../../services/penalty-storage.service';
import {UserStorageService} from '../../services/user-storage.service';
import {SubTask} from '../../model/subTask';
import {Observable} from 'rxjs';
import {SubtaskStorageService} from '../../services/subtask-storage.service';
import {TaskStorageService} from '../../services/task-storage.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  usersList: Observable<User[]>;
  subtasksList: Observable<SubTask[]>;

  currentUser: User;

  loggedUser: User;

  userSelected: boolean = false;

  constructor(private penaltyStorage: PenaltyStorageService, private userStorage: UserStorageService,
              private subtaskStorage: SubtaskStorageService, private taskStorage: TaskStorageService) {

  }

  ngOnInit() {
    //Get the userlist
    this.loggedUser = this.userStorage.getCurrentUser();
    let groupAux = new Group(null, null, null);
    groupAux._id = this.loggedUser.groupId;
    this.userStorage.getUsersGroup(groupAux);
  }

  onUserSelect(user: User){
    this.userSelected = true;
    this.currentUser = user;

    this.subtaskStorage.getUserSubtasks(user);
  }

  reasignTasks(){
    let groupAux = new Group(null, null, null);
    groupAux._id = this.loggedUser.groupId;
    this.taskStorage.reasignTasks(groupAux);
  }

}
