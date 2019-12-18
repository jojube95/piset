import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/model/group';
import { Observable } from 'rxjs';
import { GroupStorageService } from 'src/app/services/group-storage.service';
import { NgForm } from '@angular/forms';
import { Task } from 'src/app/model/task';
import { TaskStorageService } from 'src/app/services/task-storage.service';
import { SubTask } from 'src/app/model/subTask';
import {SubtaskStorageService} from "../../../../services/subtask-storage.service";

@Component({
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.css']
})
export class TaskManagementComponent implements OnInit {
  groupsList: Observable<Group[]>;
  currentGroup: Group = new Group('Selecciona grupo', []);
  currentTasks: Observable<Task[]>;
  currentrSubtasks: Observable<SubTask[]>;
  currentTask: Task;
  currentSubtask: SubTask;
  add: boolean = false;
  updateSubtask: boolean = false;
  updateSubtaskClicked: boolean = false;
  updateTask: boolean = false;
  subtaskAdd: boolean = false;
  loadingGroup: boolean = true;
  groupSelected: boolean = false;
  taskSelected: boolean = false;

  constructor(private groupStorage: GroupStorageService, private taskStorage: TaskStorageService, private subtaskStorage: SubtaskStorageService) { }

  ngOnInit() {
    //Read groups from socket
    this.groupsList = this.groupStorage.observeGroupsFromSocket();
    //Read tasks from socket
    this.currentTasks = this.taskStorage.observeGroupTasksFromSocket();
    //Read subtask from socket
    this.currentrSubtasks = this.subtaskStorage.observeTasksSubtasksFromSocket();

    //Tell socket that I need data
    this.groupStorage.getGroups();

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
    this.taskStorage.updateTask(this.currentGroup, this.currentTask);
  }

  onClickUpdateTask(){
    this.updateTask = true;
  }

  onClickCancelSubtask(){
    this.subtaskAdd = false;
  }

  onClickCancelUpdateTask(){
    this.updateTask = false;
  }

  onClickUpdateSubtask(){
    this.updateSubtaskClicked = true;
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
    this.onGroupSelect(this.currentGroup);
  }

  onUpdateSubTask(form: NgForm){
    let subtask = new SubTask(form.value.name, form.value.description, form.value.penalty, this.currentSubtask._id,
      this.currentSubtask.taskId, this.currentSubtask.groupId);

    this.subtaskStorage.updateSubtask(this.currentTask, subtask);
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
    console.log(this.currentTask);
    console.log(subTask);
    this.subtaskStorage.deleteSubtask(this.currentTask, subTask);
  }

  onGroupSelect(group: Group){
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
  }

  onClickCancel(){
    this.add = false;
  }

  onClickAdd() {
    this.add = true;
  }


}
