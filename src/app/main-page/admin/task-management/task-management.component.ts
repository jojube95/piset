import { Component, OnInit } from '@angular/core';
import {Group} from '../../../model/group';
import {Task} from '../../../model/task';
import {GroupStorageService} from '../../../services/group-storage.service';
import {TaskStorageService} from '../../../services/task-storage.service';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.scss'],
})
export class TaskManagementComponent implements OnInit {
  currentGroup: Group = new Group('Selecciona grupo');
  currentTask: Task;
  currentEditTask: Task;
  addTask: boolean = false;
  updateTask: boolean = false;
  subtaskAdd: boolean = false;
  loadingGroup: boolean = true;
  groupSelected: boolean = false;
  taskSelected: boolean = false;

  formAddTask: FormGroup;
  formUpdateTask: FormGroup;

  constructor(public groupStorage: GroupStorageService, public taskStorage: TaskStorageService, private fb: FormBuilder) { }

  ngOnInit() {
    //Set control variables
    this.loadingGroup = false;

    this.formAddTask = this.fb.group({
      taskName: ['', [
        Validators.required
      ]],
      taskDescription: ['', [
        Validators.required
      ]]
    });

    this.formUpdateTask = this.fb.group({
      taskName: ['', [
        Validators.required
      ]],
      taskDescription: ['', [
        Validators.required
      ]]
    });

  }

  onClickTask(task: Task){
    this.taskSelected = true;
    this.addTask = false;
    this.currentTask = task;
  }

  onUpdateTask(){
    this.taskStorage.updateTask(this.currentTask);
  }

  onClickCancelUpdateTask(){
    this.updateTask = false;
  }

  onClickDeleteTask(task: Task){
    this.taskStorage.deleteTaskFromGroup(task);
    this.addTask = false;
    this.taskSelected = false;
    this.groupSelected = true;
  }

  onGroupSelect(event){
    let group = event.detail.value;
    this.addTask = false;
    this.taskSelected = false;
    this.groupSelected = true;
    this.currentGroup = group;
    this.taskStorage.getGroupTasks(group);
  }

  selectGroup(group: Group){
    this.addTask = false;
    this.taskSelected = false;
    this.groupSelected = true;
    this.currentGroup = group;
    this.taskStorage.getGroupTasks(group);
  }

  onClickAdd() {
    this.addTask = true;
    this.taskSelected = false;
  }

}
