import { Component, OnInit } from '@angular/core';
import {UserStorageService} from '../../services/user-storage.service';
import {User} from '../../model/user';
import {HistoryStorageService} from '../../services/history-storage.service';
import {TaskStorageService} from '../../services/task-storage.service';
import {Group} from '../../model/group';
import {Task} from '../../model/task';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  selectedUser: User;
  selectedGroup: Group;
  selectedTask: Task;
  selectedDate: Date;

  loggedUser: User;

  isUserInGroup: boolean = false;

  loading = true;

  constructor(public userStorage: UserStorageService, public historyStorage: HistoryStorageService, private taskStorage: TaskStorageService) {

  }

  ngOnInit() {
    this.loggedUser = this.userStorage.getCurrentUser();
    this.loading = false;

    if(this.loggedUser.groups.length > 0 && this.loggedUser.groups != null){
      this.isUserInGroup = true;
      //Get all tasks userGroups
      this.taskStorage.getUserGroupsTasks(this.loggedUser.groups);
      //Get all histories group
      this.historyStorage.getUserGroupsHistories(this.loggedUser.groups);

    }
    else {
      this.isUserInGroup = false;
    }


  }

  onGroupSelect(event){
    if(event.detail.value != 'any'){
      let group = event.detail.value.group;
      this.selectedGroup = group;
      this.selectedUser = undefined;
      this.userStorage.getUsersGroup(group);
    }
    else{
      this.selectedGroup = undefined;
      this.selectedUser = undefined;
      this.selectedTask = undefined;
    }
  }

  onUserSelect(event){
    if(event.detail.value != 'any'){
      let user = event.detail.value;
      this.selectedUser = user;
    }
    else{
      this.selectedUser = undefined;
    }

  }

  onTaskSelect(event){
    if(event.detail.value != 'any'){
      let task = event.detail.value;
      this.selectedTask = task;
    }
    else{
      this.selectedTask = undefined;
    }

  }

  onDateFilterChange(event){
    let date = event.detail.value;
    this.selectedDate = new Date(date);
  }

}
