import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SignInComponent } from './sign-in.component';
import { TestService} from '../../services/test.service';
import {AuthService} from '../auth.service';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';


describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let el: DebugElement;
  let authService: AuthService;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};

  beforeEach(async(() => {

    const authServiceSpy = jasmine.createSpyObj('AuthService', ['signinUser']);

    TestBed.configureTestingModule({
      declarations: [ SignInComponent ],
      imports: [IonicModule.forRoot()],
      providers: [
        { provie: AuthService, useValue: authServiceSpy}
      ]
    }).compileComponents().then(()=> {
      fixture = TestBed.createComponent(SignInComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      authService = TestBed.inject(AuthService);
    });


  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should execute logIn service when click on signIn with user'), () => {
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

    expect(authServiceSpy).toHaveBeenCalledWith('user1@user.com', 'useruser');

  }

  it('should open register page when click sign up'), () => {
    const signUpButton = el.query(By.css('#signUpButton'));

    signUpButton.nativeElement.click();

    fixture.detectChanges();

    expect (routerSpy.navigate).toHaveBeenCalledWith(['/signUp']);
  }
});
