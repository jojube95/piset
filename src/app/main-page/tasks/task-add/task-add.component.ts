import {Component, Input, OnInit} from '@angular/core';
import {Task} from '../../../model/task';
import {TaskStorageService} from '../../../services/task-storage.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Group} from '../../../model/group';
import {State} from '../../../model/state';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss'],
})
export class TaskAddComponent implements OnInit {
  formAddTask: FormGroup;

  @Input() group: Group;

  constructor(public taskStorage: TaskStorageService, private fb: FormBuilder) {}


  ngOnInit() {

    this.formAddTask = this.fb.group({
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
  }

  onAdd(){
    if(this.formAddTask.valid){
      let task = new Task(this.formAddTask.controls['name'].value, this.formAddTask.controls['description'].value, this.group._id,
          null, null, this.formAddTask.controls['dateIni'].value, this.formAddTask.controls['dateEnd'].value,
          this.formAddTask.controls['estimatedTime'].value, new State(this.formAddTask.controls['state'].value));

      this.taskStorage.addTaskToGroup(task);
    }
  }
}
