import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../model/user';
import {SubTask} from '../../model/subTask';
import {PenaltyStorageService} from '../../services/penalty-storage.service';
import {UserStorageService} from '../../services/user-storage.service';
import {SubtaskStorageService} from "../../services/subtask-storage.service";
import {Group} from "../../model/group";
import {TaskStorageService} from "../../services/task-storage.service";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
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
