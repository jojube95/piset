import { Component, OnInit } from '@angular/core';
import {User} from 'firebase';
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
  userAuth: User;
  userLogged: UserModel;

  constructor(private authService: AuthService, private dataStorageService: UserStorageService) { }

  ngOnInit() {
    this.userAuth = this.authService.getCurrentUser();

    this.dataStorageService.getObservableUsers().subscribe(async users => {
      this.userLogged = await users.find(i => i.uid === this.userAuth.uid);

    });
  }

  logOut(){
    this.authService.signOut();
  }

}
