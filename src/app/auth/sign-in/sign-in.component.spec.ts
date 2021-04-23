import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { SignInComponent } from './sign-in.component';
import {AuthService} from '../auth.service';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let el: DebugElement;

  let authService: any;

  let router: Router;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ SignInComponent],
      imports: [IonicModule.forRoot(), RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule],
      providers: [AuthService]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(SignInComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      authService = TestBed.get(AuthService);
      router = TestBed.get(Router);
      spyOn(router, 'navigate');
      spyOn(authService, 'signinUser').and.callFake(() => {
        router.navigate(['/main']);
      });
      component.ngOnInit();
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    // Form shuld be invalid at start
    expect(component.form.valid).toBeFalsy();

    fixture.detectChanges();

    // Sign in button should be disabled
    const signInButton = el.query(By.css('#signInButton'));
    expect(signInButton.nativeElement.disabled).toBeTruthy();
  });

  it('form field validity', () => {
    // Test email field validity
    const email = component.form.controls.email;
    expect(email.valid).toBeFalsy();

    let errors = {};
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();
    expect(component.form.valid).toBeFalsy();

    email.setValue('test');
    errors = email.errors || {};
    expect(errors['pattern']).toBeTruthy();
    expect(errors['required']).toBeFalsy();
    expect(component.form.valid).toBeFalsy();

    email.setValue('test@test.com');
    errors = email.errors || {};
    expect(errors['pattern']).toBeFalsy();
    expect(errors['required']).toBeFalsy();
    expect(component.form.valid).toBeFalsy();

    // Test password field validity
    const password = component.form.controls['password'];
    expect(password.valid).toBeFalsy();
    expect(component.form.valid).toBeFalsy();

    let errors2 = {};
    errors2 = password.errors || {};
    expect(errors2['required']).toBeTruthy();
    expect(component.form.valid).toBeFalsy();

    password.setValue('test');
    errors2 = password.errors || {};
    expect(errors2['minlength']).toBeTruthy();
    expect(errors2['required']).toBeFalsy();
    expect(component.form.valid).toBeFalsy();

    password.setValue('testtest');
    errors2 = password.errors || {};
    expect(errors2['minlength']).toBeFalsy();
    expect(errors2['required']).toBeFalsy();
    expect(component.form.valid).toBeTruthy();
  });

  it('should execute logIn service when click on signIn with user', () => {
   // set up spies, could also call a fake method in case you don't want the API call to go through
    const signinSpy = spyOn(fixture.componentInstance, 'signIn').and.callThrough();

    // make sure they haven't been called yet
    expect(signinSpy).not.toHaveBeenCalled();
    expect(authService.signinUser).not.toHaveBeenCalled();

    component.form.controls['email'].setValue('user1@user.com');
    component.form.controls['password'].setValue('useruser');

    fixture.detectChanges();

    expect(component.form.valid).toBeTruthy();
    expect(el.query(By.css('#signInButton')).nativeElement.disabled).toBeFalsy();

    component.signIn();

    fixture.detectChanges();

    expect(authService.signinUser).toHaveBeenCalledWith('user1@user.com', 'useruser');
    expect(router.navigate).toHaveBeenCalledWith(['/main']);
   });

  it('should open register page when click sign up', () => {
    const signUpButton = el.query(By.css('#signUpButton'));

    signUpButton.nativeElement.click();

    expect(router.navigate).toHaveBeenCalledWith(['/signUp']);
  });
});
