import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
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
