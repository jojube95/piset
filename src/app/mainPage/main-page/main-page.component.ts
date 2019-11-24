import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-user-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  loading = true;
  userLogged: User;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userLogged = this.authService.getCurrentUser();
    this.loading = false;

  }

  logOut(){
    this.authService.signOut();
  }

}
