import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../../model/user';
import {Router} from '@angular/router';
import {ConfirmedValidator} from '../../ui/confirmed.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  form: FormGroup;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]],
      confPassword: ['', [
        Validators.required,
        Validators.minLength(8)
      ]],
      name: ['', [
        Validators.required
      ]],
      secondName: ['', [
        Validators.required
      ]]
    },{
      validator: ConfirmedValidator('password', 'confPassword')
    });
  }

  signUp() {
    if(this.form.valid){
      const user = new User(this.form.value.mail,
          this.form.value.password, this.form.value.name, this.form.value.secondName, false, false, false);

      this.authService.signupUser(user);
    }
  }

  onBack(){
    this.router.navigate(['/signIn']);
  }
}
