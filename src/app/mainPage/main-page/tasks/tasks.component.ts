import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../../model/user';
import {SubTask} from '../../../model/subTask';
import {PenaltyStorageService} from '../../../services/penalty-storage.service';
import {UserStorageService} from '../../../services/user-storage.service';
import {SubtaskStorageService} from "../../../services/subtask-storage.service";

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
              private subtaskStorage: SubtaskStorageService) {

  }

  ngOnInit() {
    //Observe userList of current userLogged group
    this.usersList =  this.userStorage.observeUsersGroupFromSocket();
    
    //Get the userlist
    this.currentUser = this.userStorage.getCurrentUser();
    groupAux: Group = new Group(null, null);
    groupAux._id = this.currentUser.groupId;
    this.userStorage.getUsersGroup(groupAux);
  }

  onUserSelect(user: User){
    this.userSelected = true;
    this.currentUser = null;

    this.subtasksList = this.subtaskStorage.getUserSubtasks(user);
  }


}
