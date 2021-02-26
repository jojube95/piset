import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SignInComponent } from './sign-in.component';
import { TestService} from '../../services/test.service';
import {AuthService} from '../auth.service';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';


describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let el: DebugElement;

  let authService: any;

  let router: Router;

  beforeEach(async(() => {

    const authServiceSpy = jasmine.createSpyObj('AuthService', ['signinUser']);

    TestBed.configureTestingModule({
      declarations: [ SignInComponent, NgForm],
      imports: [IonicModule.forRoot(), RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provie: AuthService, useValue: authServiceSpy}
      ]
    }).compileComponents().then(()=> {
      fixture = TestBed.createComponent(SignInComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      authService = TestBed.get(AuthService);
      router = TestBed.get(Router);
      spyOn(router, 'navigate');

    });



  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should execute logIn service when click on signIn with user', () => {
    // set up spies, could also call a fake method in case you don't want the API call to go through
    const authServiceSpy = spyOn(authService, 'signinUser').and.callThrough();

    // make sure they haven't been called yet
    expect(authServiceSpy).not.toHaveBeenCalled();

    fixture.detectChanges();

    const signInButton = el.query(By.css('#signInButton'));
    const inputMail = el.query(By.css('#inputMail'));
    const inputPassword = el.query(By.css('#inputPassword'));

    inputMail.nativeNode.value = 'user1@user.com';
    inputPassword.nativeNode.value = 'useruser';

    fixture.detectChanges();

    signInButton.nativeElement.click();

    fixture.detectChanges();

    expect(component).toHaveBeenCalledWith('user1@user.com', 'useruser');
  });

  it('should open register page when click sign up', () => {
    let signUpButton = el.query(By.css('#signUpButton'));

    console.log(signUpButton.nativeElement);

    signUpButton.nativeElement.click();
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalledWith(['/signUp']);
  })
});
