import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
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
      ]]
    })
  }

  signIn() {
    if(this.form.valid){
      this.authService.signinUser(this.form.value.email, this.form.value.password);
    }
  }
  signUp(){
    this.router.navigate(['/signUp']);
  }

}
