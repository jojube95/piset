import { Component, OnInit } from '@angular/core';
import {SubTask} from '../../../model/subTask';
import {Group} from '../../../model/group';
import {Task} from '../../../model/task';
import {GroupStorageService} from '../../../services/group-storage.service';
import {TaskStorageService} from '../../../services/task-storage.service';
import {SubtaskStorageService} from '../../../services/subtask-storage.service';
import {NgForm} from '@angular/forms';

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
  updateSubtask: boolean = false;
  updateSubtaskClicked: boolean = false;
  updateTask: boolean = false;
  subtaskAdd: boolean = false;
  loadingGroup: boolean = true;
  groupSelected: boolean = false;
  taskSelected: boolean = false;

  constructor(public groupStorage: GroupStorageService, public taskStorage: TaskStorageService, public subtaskStorage: SubtaskStorageService) { }

  ngOnInit() {
    //Read groups

    //Set control variables
    this.loadingGroup = false;
  }

  onClickTask(task: Task){
    this.updateSubtaskClicked = false;
    this.updateSubtask = false;
    this.taskSelected = true;
    this.add = false;
    this.currentTask = task;
    this.subtaskStorage.getTaskSubtasks(this.currentTask);
  }
  onClickAddSubtask(){
    this.subtaskAdd = true;
  }

  onUpdateTask(){
    console.log('Clickeado UpdateTask');
    console.log(this.currentTask);
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
    this.currentEditSubtask = new SubTask(this.currentSubtask.name, this.currentSubtask.description, this.currentSubtask.penalty, this.currentSubtask._id, this.currentSubtask.taskId, this.currentSubtask.groupId, this.currentSubtask.userId);
  }

  onClickCancelUpdateSubtask(){
    this.updateSubtaskClicked = false;
  }

  onSubtaskSelect(subtask: SubTask){
    this.updateSubtask = true;
    this.currentSubtask = subtask;
  }

  onAddUpdateTask(form: NgForm){
    let task = new Task(form.value.name, this.currentTask.subtasks, this.currentTask._id);
    this.taskStorage.updateTask(this.currentGroup, task);
    this.selectGroup(this.currentGroup);
  }

  onUpdateSubTask(form: NgForm){
    let subtask = new SubTask(form.value.name, form.value.description, form.value.penalty, this.currentSubtask._id,
        this.currentSubtask.taskId, this.currentSubtask.groupId);

    this.subtaskStorage.updateSubtask(this.currentTask, subtask);
    this.updateSubtask = false;
  }

  onAddSubTask(form: NgForm){
    let subtask = new SubTask(form.value.name, form.value.description, form.value.penalty);
    this.subtaskStorage.addSubtaskToTask(subtask, this.currentTask, this.currentGroup);
  }

  onClickDeleteTask(task: Task){
    this.taskStorage.deleteTaskFromGroup(this.currentGroup, task);
    this.onGroupSelect(this.currentGroup);
  }

  onClickDeleteSubtask(subTask: SubTask){
    this.subtaskStorage.deleteSubtask(this.currentTask, subTask);
  }

  onGroupSelect(event){
    let group = event.detail.value;
    this.updateSubtask = false;
    this.updateSubtaskClicked = false;
    this.add = false;
    this.taskSelected = false;
    this.groupSelected = true;
    this.currentGroup = group;
    this.taskStorage.getGroupTasks(group);
  }

  selectGroup(group: Group){
    this.updateSubtask = false;
    this.updateSubtaskClicked = false;
    this.add = false;
    this.taskSelected = false;
    this.groupSelected = true;
    this.currentGroup = group;
    this.taskStorage.getGroupTasks(group);
  }

  onAddTask(form: NgForm){
    let task = new Task(form.value.taskName, []);
    this.taskStorage.addTaskToGroup(this.currentGroup, task);
    this.subtaskAdd = false;
  }

  onClickCancel(){
    this.add = false;
  }

  onClickAdd() {
    this.add = true;
  }

}
