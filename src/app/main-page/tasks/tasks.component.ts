import { Component, OnInit } from '@angular/core';
import {Group} from '../../model/group';
import {User} from '../../model/user';
import {UserStorageService} from '../../services/user-storage.service';
import {Task} from '../../model/task';
import {TaskStorageService} from '../../services/task-storage.service';
import {GroupStorageService} from '../../services/group-storage.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  selectedUser: User;
  selectedTask: Task;
  selectedGroup: Group;

  loggedUser: User;

  isUserInGroup: boolean = false;

  loading = true;

  constructor(private groupStorage: GroupStorageService, private userStorage: UserStorageService, private taskStorage: TaskStorageService) {

  }

  ngOnInit() {
    this.loggedUser = this.userStorage.getCurrentUser();
    this.loading = false;

    if(this.loggedUser.groups.length > 0 && this.loggedUser.groups != null){
      this.isUserInGroup = true;
      //Select first group??
      //Retrieve all user tasks??

    }
    else {
      this.isUserInGroup = false;
    }
  }

  onGroupSelect(event){
    let group = event.detail.value;
    this.userStorage.getUsersGroup(group);

  }

  onUserSelect(event){
    let user = event.detail.value;
    this.selectedUser = user;
    //Get tasks user
    
  }

  reasignTasks(){
    this.taskStorage.reasignTasks(this.selectedGroup);
  }
}
