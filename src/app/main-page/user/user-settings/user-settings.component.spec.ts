import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { UserSettingsComponent } from './user-settings.component';
import {AuthService} from '../../../auth/auth.service';
import {TestService} from '../../../services/test.service';
import {DebugElement} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('UserSettingsComponent', () => {
  let component: UserSettingsComponent;
  let fixture: ComponentFixture<UserSettingsComponent>;
  let el: DebugElement;

  let authService: any;
  let testService: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSettingsComponent ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService, TestService]
    }).compileComponents().then(() => {
      authService = TestBed.get(AuthService);
      testService = TestBed.get(TestService);

      fixture = TestBed.createComponent(UserSettingsComponent);
      el = fixture.debugElement;
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
