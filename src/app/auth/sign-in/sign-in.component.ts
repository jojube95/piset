import {AfterContentChecked, AfterViewChecked, AfterViewInit, Component, OnChanges, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {TestService} from '../../services/test.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {}

  onSignin(form: NgForm) {
    this.authService.signinUser(form.value.mail, form.value.password);
  }
  onSignUp(){
    this.router.navigate(['/signUp']);
  }

}
