import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserInvitationsComponent} from './user-invitations.component';

xdescribe('UserInvitationsComponent', () => {
  let component: UserInvitationsComponent;
  let fixture: ComponentFixture<UserInvitationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInvitationsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserInvitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('show current invitations', () => {

  });

  it('validation invite form', () => {

  });

  it('invite user that doesnt exist show error', () => {

  });

  it('invite user with group show error', () => {

  });

  it('accept invitation update my current group', () => {

  });
});
