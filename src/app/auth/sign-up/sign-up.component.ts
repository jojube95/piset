import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../../model/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    const user = new User(form.value.mail,
      form.value.password, form.value.name, form.value.secondName, false, false, false);

    this.authService.signupUser(user);
    this.router.navigate(['/signUp']);
  }

  onBack(){
    this.router.navigate(['/signIn']);
  }

}
