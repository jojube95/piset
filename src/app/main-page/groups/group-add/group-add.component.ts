import {Component, Input, OnInit} from '@angular/core';
import {Group} from '../../../model/group';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GroupStorageService} from '../../../services/group-storage.service';

@Component({
  selector: 'app-group-add',
  templateUrl: './group-add.component.html',
  styleUrls: ['./group-add.component.scss'],
})
export class GroupAddComponent implements OnInit {
  formAddGroup: FormGroup;

  constructor(public groupStorage: GroupStorageService, private fb: FormBuilder) { }

  ngOnInit() {
    this.formAddGroup = this.fb.group({
      name: ['', [
        Validators.required
      ]]
    });
  }

  onAdd(){
    if (this.formAddGroup.valid){
      const group = new Group(this.formAddGroup.controls['name'].value);

      this.groupStorage.createGroup(group);
    }
  }

}
