import { Component, OnInit } from '@angular/core';
import {User} from '../../../../model/user';
import {AuthService} from '../../../../auth/auth.service';
import {UserStorageService} from '../../../../services/user-storage.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  loading = true;
  userLogged: User;

  constructor(private authService: AuthService, private userStorage: UserStorageService) {
  }

  ngOnInit() {
    this.userLogged = this.authService.getCurrentUser();
    this.loading = false;
  }

  onUpdate(form: NgForm) {
    this.userLogged.name = form.value.name;
    this.userLogged.secondName = form.value.secondName;

    this.userStorage.updateUserProfile(this.userLogged);
  }

}
