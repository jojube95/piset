import { Component, OnInit } from '@angular/core';
import {Group} from '../../model/group';
import {User} from '../../model/user';
import {UserStorageService} from '../../services/user-storage.service';
import {Task} from '../../model/task';
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
  selectedUser: User;
  selectedTask: Task;

  loggedUser: User;

  isUserInGroup: boolean = false;

  loading = true;

  constructor(private userStorage: UserStorageService,
              private subtaskStorage: SubtaskStorageService, private taskStorage: TaskStorageService) {

  }

  ngOnInit() {
    this.loggedUser = this.userStorage.getCurrentUser();
    this.loading = false;

    if(this.loggedUser.groupId == null || this.loggedUser.groupId.length == 0){
      this.isUserInGroup = false;
    }
    else {
      this.isUserInGroup = true;

      this.userStorage.getUsersGroup(new Group(this.loggedUser.groupId, null, null));
    }
  }

  onUserSelect(event){
    let user = event.detail.value;
    console.log(user);
    //Get task user
    this.taskStorage.getTaskByUser(user).subscribe(res => {
      this.selectedTask = res.task;
      this.subtaskStorage.getTaskSubtasks(this.selectedTask);
    });
  }

  reasignTasks(){
    let groupAux = new Group(null, null, null);
    groupAux._id = this.loggedUser.groupId;
    this.taskStorage.reasignTasks(groupAux);
  }

}
