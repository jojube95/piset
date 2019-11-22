import { Component, OnInit } from '@angular/core';
import {UserModel} from '../../model/userModel';
import {AuthService} from '../../auth/auth.service';
import {UserStorageService} from '../../dao/user-storage.service';


@Component({
  selector: 'app-user-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  loading = true;
  userLogged: UserModel;

  constructor(private authService: AuthService, private userStorage: UserStorageService) { }

  ngOnInit() {
    /*
    this.userAuth = this.authService.getCurrentUser();

    this.userStorage.getObservableUsers().subscribe(async users => {
      this.userLogged = await users.find(i => i.mail === this.userAuth.email);
      this.loading = await false;

    });*/
  }

  logOut(){
    this.authService.signOut();
  }

}
