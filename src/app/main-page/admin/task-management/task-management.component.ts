import { Component, OnInit } from '@angular/core';
import {SubTask} from '../../../model/subTask';
import {Group} from '../../../model/group';
import {Task} from '../../../model/task';
import {GroupStorageService} from '../../../services/group-storage.service';
import {TaskStorageService} from '../../../services/task-storage.service';
import {SubtaskStorageService} from '../../../services/subtask-storage.service';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.scss'],
})
export class TaskManagementComponent implements OnInit {
  currentGroup: Group = new Group(null, 'Selecciona grupo', []);
  currentTask: Task;
  currentEditTask: Task;
  currentSubtask: SubTask;
  currentEditSubtask: SubTask;
  add: boolean = false;
  updateSubtaskBoolean: boolean = false;
  updateSubtaskClicked: boolean = false;
  updateTask: boolean = false;
  subtaskAdd: boolean = false;
  loadingGroup: boolean = true;
  groupSelected: boolean = false;
  taskSelected: boolean = false;

  formAddTask: FormGroup;
  formUpdateTask: FormGroup;
  formAddSubtask: FormGroup;
  formUpdateSubtask: FormGroup;

  constructor(public groupStorage: GroupStorageService, public taskStorage: TaskStorageService, public subtaskStorage: SubtaskStorageService, private fb: FormBuilder) { }

  ngOnInit() {
    //Set control variables
    this.loadingGroup = false;

    this.formAddTask = this.fb.group({
      taskName: ['', [
        Validators.required
      ]]
    });

    this.formUpdateTask = this.fb.group({
      taskName: ['', [
        Validators.required
      ]]
    });

    this.formAddSubtask = this.fb.group({
      name: ['', [
        Validators.required
      ]],
      description: ['', [
        Validators.required
      ]],
      penalty: ['', [
        Validators.required
      ]]
    });

    this.formUpdateSubtask = this.fb.group({
      name: ['', [
        Validators.required
      ]],
      description: ['', [
        Validators.required
      ]],
      penalty: ['', [
        Validators.required
      ]]
    });
  }

  onClickTask(task: Task){
    this.updateSubtaskClicked = false;
    this.updateSubtaskBoolean = false;
    this.taskSelected = true;
    this.add = false;
    this.currentTask = task;
    this.subtaskStorage.getTaskSubtasks(this.currentTask);
  }
  onClickAddSubtask(){
    this.subtaskAdd = true;
  }

  onUpdateTask(){
    this.taskStorage.updateTask(this.currentGroup, this.currentTask);
  }

  onClickUpdateTask(){
    this.updateTask = true;
    this.currentEditTask = new Task(this.currentTask.name, this.currentTask.subtasks, this.currentTask._id);
  }

  onClickCancelSubtask(){
    this.subtaskAdd = false;
  }

  onClickCancelUpdateTask(){
    this.updateTask = false;
  }

  onClickUpdateSubtask(){
    this.updateSubtaskClicked = true;
    this.currentEditSubtask = new SubTask(this.currentSubtask.name, this.currentSubtask.description, this.currentSubtask.penalty, this.currentSubtask.done, this.currentSubtask._id, this.currentSubtask.taskId, this.currentSubtask.groupId, this.currentSubtask.userId);
  }

  onClickCancelUpdateSubtask(){
    this.updateSubtaskClicked = false;
  }

  onSubtaskSelect(subtask: SubTask){
    this.updateSubtaskBoolean = true;
    this.currentSubtask = subtask;
  }

  addUpdateTask(){
    if(this.formAddTask.valid){
      let task = new Task(this.formAddTask.value.name, this.currentTask.subtasks, this.currentTask._id);
      this.taskStorage.updateTask(this.currentGroup, task);
      this.selectGroup(this.currentGroup);
    }
  }

  updateSubTask(){
    if(this.formUpdateSubtask.valid){
      let subtask = new SubTask(this.formUpdateSubtask.value.name, this.formUpdateSubtask.value.description, this.formUpdateSubtask.value.penalty, this.currentSubtask.done, this.currentSubtask._id,
          this.currentSubtask.taskId, this.currentSubtask.groupId);

      this.subtaskStorage.updateSubtask(subtask);
      this.updateSubtaskBoolean = false;
    }
  }

  addSubTask(){
    if(this.formAddSubtask.valid){
      let subtask = new SubTask(this.formAddSubtask.value.name, this.formAddSubtask.value.description, this.formAddSubtask.value.penalty, false);
      this.subtaskStorage.addSubtaskToTask(subtask, this.currentTask, this.currentGroup);
    }
  }

  onClickDeleteTask(task: Task){
    this.taskStorage.deleteTaskFromGroup(this.currentGroup, task);
    this.updateSubtaskBoolean = false;
    this.updateSubtaskClicked = false;
    this.add = false;
    this.taskSelected = false;
    this.groupSelected = true;
  }

  onClickDeleteSubtask(subTask: SubTask){
    this.subtaskStorage.deleteSubtask(this.currentTask, subTask);
  }

  onGroupSelect(event){
    let group = event.detail.value;
    this.updateSubtaskBoolean = false;
    this.updateSubtaskClicked = false;
    this.add = false;
    this.taskSelected = false;
    this.groupSelected = true;
    this.currentGroup = group;
    this.taskStorage.getGroupTasks(group);
  }

  selectGroup(group: Group){
    this.updateSubtaskBoolean = false;
    this.updateSubtaskClicked = false;
    this.add = false;
    this.taskSelected = false;
    this.groupSelected = true;
    this.currentGroup = group;
    this.taskStorage.getGroupTasks(group);
  }

  addTask(){
    if(this.formAddTask.valid){
      let task = new Task(this.formAddTask.value.taskName, []);
      this.taskStorage.addTaskToGroup(this.currentGroup, task);
      this.subtaskAdd = false;
    }
  }

  onClickCancel(){
    this.add = false;
  }

  onClickAdd() {
    this.add = true;
  }

}
