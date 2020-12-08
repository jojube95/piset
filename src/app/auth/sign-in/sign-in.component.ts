import {AfterContentChecked, AfterViewChecked, AfterViewInit, Component, OnChanges, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  loading: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {

  }

  onSignin(form: NgForm) {
    this.authService.signinUser(form.value.mail, form.value.password);
  }

}
