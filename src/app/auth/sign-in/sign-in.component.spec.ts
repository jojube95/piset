import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SignInComponent } from './sign-in.component';
import {AuthService} from '../auth.service';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormBuilder} from '@angular/forms';
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
      declarations: [ SignInComponent],
      imports: [IonicModule.forRoot(), RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provie: AuthService, useValue: authServiceSpy},
        FormBuilder
      ]
    }).compileComponents().then(()=> {
      fixture = TestBed.createComponent(SignInComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      authService = TestBed.get(AuthService);
      router = TestBed.get(Router);
      spyOn(router, 'navigate');
      component.ngOnInit();
    });



  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('email field validity', ()=>{
    let email = component.form.controls['email'];
    expect(email.valid).toBeFalsy();

    let errors = {};
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    email.setValue('test');
    errors = email.errors || {};
    expect(errors['pattern']).toBeTruthy();
    expect(errors['required']).toBeFalsy();

    email.setValue('test@test.com');
    errors = email.errors || {};
    expect(errors['pattern']).toBeFalsy();
    expect(errors['required']).toBeFalsy();

  });

  it('should execute logIn service when click on signIn with user', () => {
    // set up spies, could also call a fake method in case you don't want the API call to go through
    const signinSpy = spyOn(fixture.componentInstance, 'signIn').and.callThrough();
    const authServiceSignInSpy = spyOn(authService, 'signinUser');

    fixture.detectChanges();

    // make sure they haven't been called yet
    expect(signinSpy).not.toHaveBeenCalled();
    expect(component.form.valid).toBeFalsy();

    component.form.controls['email'].setValue('user1@user.com');
    component.form.controls['password'].setValue('useruser')

    fixture.detectChanges();

    component.signIn();

    fixture.detectChanges();

    expect(component.form.valid).toBeTruthy();
    expect(component.form.controls['email'].value).toBe('user1@user.com');
    expect(component.form.controls['password'].value).toBe('useruser');
    expect(authServiceSignInSpy).toHaveBeenCalledWith('user1@user.com', 'useruser');
   });

  it('should open register page when click sign up', () => {
    let signUpButton = el.query(By.css('#signUpButton'));

    signUpButton.nativeElement.click();
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalledWith(['/signUp']);
  })
});
