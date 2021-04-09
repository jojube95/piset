import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {UserStorageService} from '../../../../services/user-storage.service';
import {AuthService} from '../../../../auth/auth.service';
import {User} from '../../../../model/user';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss'],
})
export class UserUpdateComponent implements OnInit {
  @Input() user: User;
  form: FormGroup;

  constructor(private authService: AuthService, private userStorage: UserStorageService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [
        Validators.required
      ]],
      secondName: ['', [
        Validators.required
      ]]
    })
  }

  update() {
    if(this.form.valid){
      this.user.name = this.form.value.name;
      this.user.secondName = this.form.value.secondName;

      this.userStorage.updateUserProfile(this.user);
    }

  }

}
