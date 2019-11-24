import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/model/group';
import { Observable } from 'rxjs';
import { GroupStorageService } from 'src/app/services/group-storage.service';
import { NgForm } from '@angular/forms';
import { Task } from 'src/app/model/task';
import { TaskStorageService } from 'src/app/services/task-storage.service';
import { SubTask } from 'src/app/model/subTask';

@Component({
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.css']
})
export class TaskManagementComponent implements OnInit {
  groupsList: Observable<Group[]>;
  currentGroup: Group = new Group('Selecciona grupo', []);
  currentTasks: Observable<Task[]>;
  currentrSubtasks: Observable<any>;
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

  constructor(private groupStorage: GroupStorageService, private taskStorage: TaskStorageService) { }

  ngOnInit() {
    this.groupStorage.getObservableGroups().subscribe(async () => {
      this.groupsList =  await this.groupStorage.getObservableGroups();
      this.loadingGroup = await false;
    });
  }

  onClickTask(task: Task){
    this.updateSubtaskClicked = false;
    this.updateSubtask = false;
    this.taskSelected = true;
    this.add = false;
    this.currentTask = task;
    this.currentrSubtasks = this.taskStorage.getGroupTaskSubtaks(this.currentGroup, this.currentTask);
  }
  onClickAddSubtask(){
    this.subtaskAdd = true;
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
    let task = new Task(form.value.name, this.currentTask.subtasks, this.currentTask.id);
    this.taskStorage.updateGroupTask(this.currentGroup, task);
    this.onGroupSelect(this.currentGroup);
  }

  onUpdateSubTask(form: NgForm){
    let subtask = new SubTask(form.value.name, form.value.description, form.value.penalty, this.currentSubtask.id,
      this.currentSubtask.taskId, this.currentSubtask.groupId);
    this.taskStorage.updateSubTask(subtask);
  }

  onAddSubTask(form: NgForm){
    let subtask = new SubTask(form.value.name, form.value.description, form.value.penalty);
    this.taskStorage.addSubTask(this.currentGroup, this.currentTask, subtask);
  }

  onClickDeleteTask(task: Task){
    this.taskStorage.deleteTaskFromGroup(this.currentGroup, task);
    this.onGroupSelect(this.currentGroup);
  }

  onClickDeleteSubtask(subTask: SubTask){
    this.taskStorage.deleteSubTask(subTask);
  }

  onGroupSelect(group: Group){
    this.updateSubtask = false;
    this.updateSubtaskClicked = false;
    this.add = false;
    this.taskSelected = false;
    this.groupSelected = true;
    this.currentrSubtasks = null;
    this.currentGroup = group;
    this.currentTasks = this.taskStorage.getGroupTasks(group);
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
