import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { SignUpComponent } from '../sign-up/sign-up.component';
import {AuthService} from '../auth.service';
import {ReactiveFormsModule} from '@angular/forms';
import {DebugElement} from '@angular/core';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {By} from '@angular/platform-browser';
import {User} from '../../model/user';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let el: DebugElement;

  let authService: any;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpComponent ],
      imports: [IonicModule.forRoot(), RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule],
      providers: [AuthService]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(SignUpComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      el = fixture.debugElement;
      authService = TestBed.get(AuthService);
      router = TestBed.get(Router);
      spyOn(router, 'navigate');
      spyOn(authService, 'signupUser');
      component.ngOnInit();
      fixture.detectChanges();
    });


  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form validation', () => {
    const email = component.form.controls['email'];
    const password = component.form.controls['password'];
    const confPassword = component.form.controls['confPassword'];
    const name = component.form.controls['name'];
    const secondName = component.form.controls['secondName'];

    // Check all invalid at start
    expect(email.valid).toBeFalsy();
    expect(password.valid).toBeFalsy();
    expect(confPassword.valid).toBeFalsy();
    expect(name.valid).toBeFalsy();
    expect(secondName.valid).toBeFalsy();

    // Check email validation
    expect(email.hasError('required')).toBe(true);

    email.setValue('test');

    expect(email.hasError('required')).toBe(false);
    expect(email.hasError('pattern')).toBe(true);

    email.setValue('test@test.com');

    expect(email.hasError('required')).toBe(false);
    expect(email.hasError('pattern')).toBe(false);

    // Check password validation
    password.setValue('asdas');

    expect(password.hasError('required')).toBe(false);
    expect(password.hasError('minlength')).toBe(true);

    password.setValue('aaaabbbb');

    expect(password.hasError('required')).toBe(false);
    expect(password.hasError('minlength')).toBe(false);

    // Check confPassword validation
    expect(confPassword.hasError('required')).toBe(true);

    confPassword.setValue('aaaa');
    expect(confPassword.hasError('required')).toBe(false);
    expect(confPassword.hasError('minlength')).toBe(true);

    confPassword.setValue('aaaabbbb');
    expect(confPassword.hasError('required')).toBe(false);
    expect(confPassword.hasError('minlength')).toBe(false);

    // Check name validation
    expect(name.hasError('required')).toBe(true);

    name.setValue('name');
    expect(name.hasError('required')).toBe(false);

    // Check secondName validation
    expect(secondName.hasError('required')).toBe(true);

    secondName.setValue('secondName');
    expect(secondName.hasError('required')).toBe(false);

    expect(el.query(By.css('#registerButton')).nativeElement.disabled).toBeTruthy();
  });

  it('click on register should call service method', () => {
    const signupSpy = spyOn(fixture.componentInstance, 'signUp').and.callThrough();

    const registerButton = el.query(By.css('#registerButton'));

    const email = component.form.controls['email'];
    const password = component.form.controls['password'];
    const confPassword = component.form.controls['confPassword'];
    const name = component.form.controls['name'];
    const secondName = component.form.controls['secondName'];

    email.setValue('test@test.com');
    password.setValue('testtest');
    confPassword.setValue('testtest');
    name.setValue('test');
    secondName.setValue('test');

    fixture.detectChanges();

    registerButton.nativeElement.click();

    const user = new User(component.form.value.mail,
        component.form.value.password, component.form.value.name, component.form.value.secondName, false, [], []);

    expect(signupSpy).toHaveBeenCalled();
    expect(authService.signupUser).toHaveBeenCalledWith(user);
  });

  it('back button should be enabled', () => {
    const backButton = el.query(By.css('#backButton'));

    expect(backButton.nativeElement.disabled).toBeFalsy();
  });

  it('click on back button should navigate to logIn page', () => {
    const backButton = el.query(By.css('#backButton'));

    backButton.nativeElement.click();

    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalledWith(['/signIn']);
  });

});
