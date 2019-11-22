import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {UserStorageService} from "../../dao/user-storage.service";


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private authService: AuthService, private userStorageService: UserStorageService ) { }

  ngOnInit() {
  }

  onSignin(form: NgForm) {
    this.authService.signinUser(form.value.email, form.value.password);
  }

}
