import {Component, Input, OnInit} from '@angular/core';
import {Group} from '../../../model/group';
import {TaskStorageService} from '../../../services/task-storage.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GroupStorageService} from '../../../services/group-storage.service';

@Component({
  selector: 'app-group-update',
  templateUrl: './group-update.component.html',
  styleUrls: ['./group-update.component.scss'],
})
export class GroupUpdateComponent implements OnInit {
  @Input() group: Group;

  formUpdateGroup: FormGroup;

  constructor(public groupStorage: GroupStorageService, private fb: FormBuilder) { }

  ngOnInit() {
    this.formUpdateGroup = this.fb.group({
      name: ['', [
        Validators.required
      ]]
    });

    this.formUpdateGroup.controls['name'].setValue(this.group.name);
  }

  onUpdate(){
    this.group.name = this.formUpdateGroup.controls['name'].value;

    this.groupStorage.updateGroup(this.group);
  }

}
