import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {UserModel} from '../model/userModel';
import {UserStorageService} from '../dao/user-storage.service';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;

  constructor(private router: Router, private userStorage: UserStorageService, private http: HttpClient) {
  }

  signOut() {
    // To develop
  }

  signupUser(userObj: UserModel) {

    this.http.post('http://localhost:3000/api/users/signup', userObj).subscribe(response => {
      console.log(response);
    });
  }

  signinUser(email: string, password: string) {
    console.log(email);
    console.log(password);
    this.http.post('http://localhost:3000/api/users/signin', {mail: email, password: password}).subscribe(response => {
      console.log(response);
    });

  }


  getCurrentUser() {
    // To develop
  }

  isAuthenticated() {
    return this.token != null;
  }


}
