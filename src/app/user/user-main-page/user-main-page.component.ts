import { Component, OnInit } from '@angular/core';
import {User} from 'firebase';
import {UserModel} from '../../shared/userModel';
import {AuthService} from '../../auth/auth.service';
import {DataStorageService} from '../../shared/data-storage.service';


@Component({
  selector: 'app-user-main-page',
  templateUrl: './user-main-page.component.html',
  styleUrls: ['./user-main-page.component.css']
})
export class UserMainPageComponent implements OnInit {
  loading = true;
  userAuth: User;
  userLogged: UserModel;

  constructor(private authService: AuthService, private dataStorageService: DataStorageService) { }

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
