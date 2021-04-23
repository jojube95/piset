import { Component, OnInit, Input } from '@angular/core';
import {State} from '../../../model/state';
import {Task} from '../../../model/task';
import {TaskStorageService} from '../../../services/task-storage.service';
import {TaskAddComponent} from '../task-add/task-add.component';
import {Group} from '../../../model/group';
import {User} from '../../../model/user';
import {TaskUpdateComponent} from '../task-update/task-update.component';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {
  @Input() state: State;
  @Input() group: Group;
  @Input() user: User;

  constructor(private matDialog: MatDialog, public taskStorageService: TaskStorageService) { }

  ngOnInit(): void {

  }

  openModalTaskUpdate(task: Task) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '400px';
    dialogConfig.width = '600px';
    dialogConfig.data = task;

    this.matDialog.open(TaskUpdateComponent, dialogConfig);
  }

  openModalTaskAdd() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '400px';
    dialogConfig.width = '600px';
    this.matDialog.open(TaskAddComponent, dialogConfig);
  }

  drop(event: CdkDragDrop<string[]>) {

    const task = event.item.data;

    task.state = this.state;

    this.taskStorageService.updateTask(task);


  }

}
