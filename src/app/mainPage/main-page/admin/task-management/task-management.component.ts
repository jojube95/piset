import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/model/group';
import { Observable } from 'rxjs';
import { GroupStorageService } from 'src/app/dao/group-storage.service';
import { NgForm } from '@angular/forms';
import { Task } from 'src/app/model/task';
import { TaskStorageService } from 'src/app/dao/task-storage.service';
import { SubTask } from 'src/app/model/subTask';

@Component({
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.css']
})
export class TaskManagementComponent implements OnInit {
  groupsList: Observable<Group[]>;
  currentGroup: Group = new Group('Selecciona grupo', []);
  currentTasks: Observable<any>;
  currentrSubtasks: Observable<any>;
  currentTask: Task;
  add: boolean = false;
  subtaskAdd: boolean = false;
  loadingGroup: boolean = true;

  constructor(private groupStorage: GroupStorageService, private taskStorage: TaskStorageService) { }

  ngOnInit() {
    this.groupStorage.getObservableGroups().subscribe(async () => {
      this.groupsList =  await this.groupStorage.getObservableGroups();
      this.loadingGroup = await false;
    });
  }

  onClickTask(task: Task){
    this.currentTask = task;
    this.currentrSubtasks = this.taskStorage.getSubtasks(this.currentGroup, this.currentTask);  
  }
  onClickAddSubtask(){
    this.subtaskAdd = true;
  }

  onClickCancelSubtask(){
    this.subtaskAdd = false;
  }

  onAddSubTask(form: NgForm){
    let subtask = new SubTask(form.value.name, form.value.description, form.value.penalty);
    this.taskStorage.addSubTask(this.currentGroup, this.currentTask, subtask);
  }

  onClickDeleteTask(task: Task){
    this.taskStorage.deleteGroupTask(this.currentGroup, task);
  }

  onClickDeleteSubtask(subTask: SubTask){
    this.taskStorage.deleteSubTask(this.currentGroup, this.currentTask, subTask);
  }

  onGroupSelect(group: Group){
    this.currentTask = null;
    this.currentrSubtasks = null;
    this.currentGroup = group;
    this.currentTasks = this.taskStorage.getGroupTasks(group);
  }

  onAddTask(form: NgForm){
    let task = new Task(form.value.name, []);
    this.taskStorage.addGroupTask(this.currentGroup, task);
  }

  onClickCancel(){
    this.add = false;
  }

  onClickAdd() {
    this.add = true;
  }


}
