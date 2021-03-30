import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../model/user';
import {HttpClient} from "@angular/common/http";
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = environment.API_URL;
  private token: string;
  private currentUser: User;

  constructor(private router: Router, private http: HttpClient) {
  }

  signOut() {
    this.token = null;
    this.clearAuthData();
    this.router.navigate(['/signIn']);
  }

  signupUser(userObj: User) {
    this.http.post(this.API_URL + '/api/users/signup', userObj).subscribe(response => {});
  }

  signinUser(mail: string, password: string) {
    this.http.post<{token: string, user: User}>(this.API_URL + '/api/users/signin', {mail: mail, password: password}).subscribe(response => {
      this.token = response.token;
      this.currentUser = new User(response.user.mail, response.user.password, response.user.name, response.user.secondName, response.user.admin, response.user.groups, response.user.achivements, response.user._id)
      this.saveAuthData(response.token, this.currentUser);
      this.router.navigate(['/main']);
    });

  }

  autoAuthUser(){
    this.token = this.getAuthData().token;
    this.currentUser = this.getAuthData().currentUser;
  }

  getAuthData(){
    const token = localStorage.getItem('token');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(token && currentUser){
      return {
        token: token,
        currentUser: currentUser
      };
    }
    else{
      return;
    }
  }

  saveAuthData(token: string, currentUser: User){
    localStorage.setItem('token', token);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }

  clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isAuthenticated() {
    return this.token != null;
  }
}
