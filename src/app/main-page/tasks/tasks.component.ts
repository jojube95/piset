import { Component, OnInit } from '@angular/core';
import {Group} from '../../model/group';
import {User} from '../../model/user';
import {UserStorageService} from '../../services/user-storage.service';
import {TaskStorageService} from '../../services/task-storage.service';
import {GroupStorageService} from '../../services/group-storage.service';
import {StateStorageService} from '../../services/state-storage.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  selectedUser: User;
  selectedGroup: Group;

  loggedUser: User;

  isUserInGroup = false;

  loading = true;

  constructor(private groupStorage: GroupStorageService, public userStorage: UserStorageService, private taskStorage: TaskStorageService,
              public stateStorage: StateStorageService) {

  }

  ngOnInit() {
    this.loggedUser = this.userStorage.getCurrentUser();
    this.loading = false;

    if (this.loggedUser.groups != null && this.loggedUser.groups.length > 0 && this.loggedUser.groups != null){
      this.isUserInGroup = true;
      // Get all tasks group
      this.taskStorage.getUserGroupsTasks(this.loggedUser.groups);

    }
    else {
      this.isUserInGroup = false;
    }
  }

  onGroupSelect(event){
    const group = event.detail.value.group;
    this.selectedGroup = group;
    this.selectedUser = undefined;
    this.userStorage.getUsersGroup(group);
  }

  onUserSelect(event){
    const user = event.detail.value;
    this.selectedUser = user;
    // Get tasks user
  }

  reasignTasks(){
    this.taskStorage.reasignTasks(this.selectedGroup);
  }
}
