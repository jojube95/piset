import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import {UserInfoComponent} from './user-info.component';
import {AuthService} from '../../../auth/auth.service';
import {TestService} from '../../../services/test.service';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('UserInfoComponent', () => {
  let component: UserInfoComponent;
  let fixture: ComponentFixture<UserInfoComponent>;
  let el: DebugElement;

  let authService: any;
  let getCurrentUserSpy: any;
  let testService: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInfoComponent ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService, TestService]
    }).compileComponents().then(() => {
      authService = TestBed.get(AuthService);
      testService = TestBed.get(TestService);

      getCurrentUserSpy = spyOn(authService, 'getCurrentUser').and.callFake(() => {
        return testService.getUserByMail('user1@user.com');
      });

      fixture = TestBed.createComponent(UserInfoComponent);
      el = fixture.debugElement;
      component = fixture.componentInstance;
      fixture.detectChanges();
    });


  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show logged user account info', () => {
    const userName = el.query(By.css('#userName'));
    const userSecondName = el.query(By.css('#userSecondName'));
    const userMail = el.query(By.css('#userMail'));

    expect(userName.nativeElement.textContent).toBe('User1');
    expect(userSecondName.nativeElement.textContent).toBe('User1');
    expect(userMail.nativeElement.textContent).toBe('user1@user.com');
  });
});
