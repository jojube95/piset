import { Component, OnInit } from '@angular/core';
import {User} from '../../../model/user';
import {AuthService} from '../../../auth/auth.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  loading = true;
  userLogged: User;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.userLogged = this.authService.getCurrentUser();
    this.loading = false;
  }

}
