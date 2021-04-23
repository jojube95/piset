import { Component, OnInit } from '@angular/core';
import {User} from '../model/user';
import {AuthService} from '../auth/auth.service';
import {MenuController} from '@ionic/angular';
import {TestService} from '../services/test.service';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  loading = true;
  userLogged: User;
  private production = environment.production;

  selectOptions = {
    title: 'Pizza Toppings',
    subTitle: 'Select your toppings',
    mode: 'md'
  };

  constructor(private authService: AuthService, private menu: MenuController, private testService: TestService, private router: Router) { }

  ngOnInit() {
    this.userLogged = this.authService.getCurrentUser();
    this.loading = false;
  }

  logOut(){
    this.authService.signOut();
  }

  openMenu(menuId){
    this.menu.open(menuId);
  }

  onClickTasks(){
    this.router.navigate(['/main/tasks']);
    this.menu.close('custom');
  }

  onClickHistory(){
    this.router.navigate(['/main/history']);
    this.menu.close('custom');
  }

  onClickTaskManagement(){
    this.router.navigate(['/main/admin/taskManagement']);
    this.menu.close('custom');
  }

  onClickUserManagement(){
    this.router.navigate(['/main/admin/userManagement']);
    this.menu.close('custom');
  }

  onClickTest(){
    this.router.navigate(['/main/admin/test']);
    this.menu.close('custom');
  }

  onClickUserInfo(){
    this.router.navigate(['/main/user/info']);
    this.menu.close('custom');
  }

  onClickUserSettings(){
    this.router.navigate(['/main/user/settings']);
    this.menu.close('custom');
  }

  onClickUserInvitations(){
    this.router.navigate(['/main/user/invitations']);
    this.menu.close('custom');
  }

  getEnvironment() {
    return this.production;
  }


}
