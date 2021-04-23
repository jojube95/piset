import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { UserInvitationsComponent} from './user-invitations.component';
import {TestService} from '../../../services/test.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {InvitationStorageService} from '../../../services/invitation-storage.service';
import {DebugElement} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

describe('UserInvitationsComponent', () => {
  let component: UserInvitationsComponent;
  let fixture: ComponentFixture<UserInvitationsComponent>;
  let el: DebugElement;

  let testService: any;
  let invitationStorageService: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInvitationsComponent ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      providers: [InvitationStorageService, TestService]
    }).compileComponents().then(() => {
      testService = TestBed.get(TestService);
      invitationStorageService = TestBed.get(InvitationStorageService);

      fixture = TestBed.createComponent(UserInvitationsComponent);
      el = fixture.debugElement;
      component = fixture.componentInstance;
      fixture.detectChanges();
    });


  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('show current invitations', () => {

  });

  xit('validation invite form', () => {

  });

  xit('invite user that doesnt exist show error', () => {

  });

  xit('invite user with group show error', () => {

  });

  xit('accept invitation update my current group', () => {

  });
});
