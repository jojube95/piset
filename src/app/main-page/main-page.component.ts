import { Component, OnInit } from '@angular/core';
import {User} from '../model/user';
import {AuthService} from '../auth/auth.service';
import {MenuController} from '@ionic/angular';
import {TestService} from '../services/test.service';
import {environment} from '../../environments/environment';

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

  constructor(private authService: AuthService, private menu: MenuController, private testService: TestService) { }

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

  closeMenu(menuId){
    this.menu.close(menuId)
  }
}
