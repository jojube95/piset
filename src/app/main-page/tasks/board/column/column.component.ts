import { Component, OnInit,Input } from '@angular/core';
import { Observable } from 'rxjs';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {TaskDetailComponent} from './task-detail/task-detail.component';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {State} from '../../../../model/state';
import {Task} from '../../../../model/task';
import {TaskStorageService} from '../../../../services/task-storage.service';
import {TaskAddComponent} from '../../task-add/task-add.component';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {
  @Input() state: State;
  @Input() tasks;

  constructor(private matDialog: MatDialog, private taskStorageService: TaskStorageService) { }

  ngOnInit(): void {

  }

  openModalTaskDetail(task: Task) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "300px";
    dialogConfig.width = "600px";
    dialogConfig.data = task;

    this.matDialog.open(TaskDetailComponent, dialogConfig);
  }

  openModalTaskAdd() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "300px";
    dialogConfig.width = "600px";
    dialogConfig.data = this.state;
    this.matDialog.open(TaskAddComponent, dialogConfig);
  }

  drop(event: CdkDragDrop<string[]>) {
    //TO IMPLEMENT
    //this.taskStorageService.updateTask(this.column.boardId, event.previousContainer.id, event.container.id, event.item.data._id);

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}
