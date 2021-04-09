import { Component, OnInit } from '@angular/core';
import {User} from '../../../model/user';
import {AuthService} from '../../../auth/auth.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent implements OnInit {
  loading = true;
  userLogged: User;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userLogged = this.authService.getCurrentUser();
    this.loading = false;
  }
}
