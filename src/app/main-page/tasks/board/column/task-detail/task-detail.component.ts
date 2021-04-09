import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material';
import {TaskStorageService} from '../../../../../services/task-storage.service';

@Component({
  selector: 'task-detail',
  templateUrl: './task-detail.component.html',
})
export class TaskDetailComponent implements OnInit {


  constructor(private taskStorageService: TaskStorageService, public dialogRef: MatDialogRef<TaskDetailComponent>, @Inject(MAT_DIALOG_DATA) public task: any) {

  }

  ngOnInit() {
    document.getElementById('modal-component').setAttribute("style", "padding: 0;");

  }


  edit(){
    this.taskStorageService.updateTask(this.task);
  }

  deleteTask(){
    this.taskStorageService.deleteTaskFromGroup(this.task);
    this.dialogRef.close();
  }

  onClickClose() {
    this.dialogRef.close();
  }

  saveDescription(value){
    if(value != this.task.description){
      this.task.description = value;
      this.edit();
    }
   }

  saveName(value){
    if(value != this.task.name){
      this.task.name = value;
      this.edit();
    }
  }
}
