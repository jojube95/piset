import { Component, OnInit } from '@angular/core';
import {Group} from '../../model/group';
import {User} from '../../model/user';
import {UserStorageService} from '../../services/user-storage.service';
import {Task} from '../../model/task';
import {TaskStorageService} from '../../services/task-storage.service';

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

  constructor(private userStorage: UserStorageService, private taskStorage: TaskStorageService) {

  }

  ngOnInit() {
    this.loggedUser = this.userStorage.getCurrentUser();
    this.loading = false;

    if(this.loggedUser.groups.length != 0 && this.loggedUser.groups != null){
      this.isUserInGroup = true;

      this.userStorage.getUsersGroup(this.selectedGroup);
      this.userStorage._usersGroup.subscribe((users) =>{
        let matchedUser = users.find(user => user._id === this.loggedUser._id);
        if(matchedUser != undefined){
          this.selectUser(matchedUser);
        }
      });
    }
    else {
      this.isUserInGroup = false;
    }
  }

  onUserSelect(event){
    let user = event.detail.value;
    this.selectedUser = user;
    //Get task user
    this.taskStorage.getTaskByUser(user).subscribe(res => {
      this.selectedTask = res.task;
    });
  }

  selectUser(user: User){
    this.selectedUser = user;
    //Get task user
    this.taskStorage.getTaskByUser(user).subscribe(res => {
      this.selectedTask = res.task;
    });
  }

  reasignTasks(){
    this.taskStorage.reasignTasks(this.selectedGroup);
  }
}
