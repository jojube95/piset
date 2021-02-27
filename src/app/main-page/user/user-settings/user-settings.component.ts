import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {UserStorageService} from '../../../services/user-storage.service';
import {AuthService} from '../../../auth/auth.service';
import {User} from '../../../model/user';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent implements OnInit {
  loading = true;
  userLogged: User;
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

    this.userLogged = this.authService.getCurrentUser();
    this.loading = false;
  }

  update() {
    if(this.form.valid){
      this.userLogged.name = this.form.value.name;
      this.userLogged.secondName = this.form.value.secondName;

      this.userStorage.updateUserProfile(this.userLogged);
    }

  }

}
