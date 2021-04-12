import {Component, Inject, Input, OnInit} from '@angular/core';
import {Task} from '../../../model/task';
import {TaskStorageService} from '../../../services/task-storage.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.scss'],
})
export class TaskUpdateComponent implements OnInit {
  formUpdateTask: FormGroup;

  constructor(public taskStorage: TaskStorageService, private fb: FormBuilder, public dialogRef: MatDialogRef<TaskUpdateComponent>, @Inject(MAT_DIALOG_DATA) public task: any) {}


  ngOnInit() {

    this.formUpdateTask = this.fb.group({
      name: ['', [
        Validators.required
      ]],
      description: ['', [
        Validators.required
      ]],
      dateIni: ['', [
        Validators.required
      ]],
      dateEnd: ['', [
        Validators.required
      ]],
      estimatedTime: ['', [
        Validators.required, Validators.pattern("^[0-9]*$"),
      ]],
      state: ['', [
        Validators.required
      ]]
    });

    this.formUpdateTask.controls['name'].setValue(this.task.name);
    this.formUpdateTask.controls['description'].setValue(this.task.description);
    this.formUpdateTask.controls['dateIni'].setValue(this.task.dateIni);
    this.formUpdateTask.controls['dateEnd'].setValue(this.task.dateEnd);
    this.formUpdateTask.controls['estimatedTime'].setValue(this.task.estimatedTime);
    this.formUpdateTask.controls['state'].setValue(this.task.state.name);
  }

  onUpdate(){
    this.task.name = this.formUpdateTask.controls['name'].value;
    this.task.description = this.formUpdateTask.controls['description'].value;
    this.task.dateIni = this.formUpdateTask.controls['dateIni'].value;
    this.task.dateEnd = this.formUpdateTask.controls['dateEnd'].value;
    this.task.estimatedTime = this.formUpdateTask.controls['estimatedTime'].value;
    this.task.state.name = this.formUpdateTask.controls['state'].value;

    this.taskStorage.updateTask(this.task);
  }

  onClickClose() {
    this.dialogRef.close();
  }
}
