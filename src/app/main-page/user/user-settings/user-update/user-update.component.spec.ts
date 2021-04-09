import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserUpdateComponent} from './user-update.component';
import {AuthService} from '../../../../auth/auth.service';
import {TestService} from '../../../../services/test.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {UserStorageService} from '../../../../services/user-storage.service';

xdescribe('UserUpdateComponent', () => {
  let component: UserUpdateComponent;
  let fixture: ComponentFixture<UserUpdateComponent>;
  let el: DebugElement;

  let userStorageService: any;
  let authService: any;
  let getCurrentUserSpy: any;
  let testService: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserUpdateComponent ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      providers: [AuthService, TestService, UserStorageService]
    }).compileComponents().then(() => {
      authService = TestBed.get(AuthService);
      testService = TestBed.get(TestService);
      userStorageService = TestBed.get(UserStorageService);

      getCurrentUserSpy = spyOn(authService, 'getCurrentUser').and.callFake(() => {
        return testService.getUserByMail('user1@user.com');
      });

      fixture = TestBed.createComponent(UserUpdateComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      fixture.detectChanges();
    });


  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initial data and form validation', () =>  {
    let userMock = testService.getUserByMail('user1@user.com');

    let nameInput = el.query(By.css('#name'));
    let secondNameInput = el.query(By.css('#secondName'));

    let name = component.form.controls['name'];
    let secondName = component.form.controls['secondName'];


    //Form has to be dirty
    expect(component.form.valid).toBeTruthy();
    expect(component.form.dirty).toBeFalsy();

    name.setValue('');
    secondName.setValue('');

    fixture.detectChanges();

    expect(name.hasError('required')).toBe(true);
    expect(secondName.hasError('required')).toBe(true);
    expect(component.form.valid).toBeFalsy();

    name.setValue('name2');
    secondName.setValue('secondName2');

    fixture.detectChanges();

    expect(name.hasError('required')).toBe(false);
    expect(secondName.hasError('required')).toBe(false);
    expect(component.form.valid).toBeTruthy();
  });

  it('change name and second name', () => {
    //Change name calls updateUserService with the new user name data

    //Spy updateUserProfile
    let onUpdateSpy = spyOn(component, 'update').and.callThrough();
    //Spy update with callThrough
    let updateUserProfileSpy = spyOn(userStorageService, 'updateUserProfile');

    //Click update button
    let name = component.form.controls['name'];
    let secondName = component.form.controls['secondName'];
    name.setValue('name2');
    secondName.setValue('secondName2');
    fixture.detectChanges();

    el.query(By.css('#userForm')).triggerEventHandler('ngSubmit', null);

    //Check if update method is called
    expect(onUpdateSpy).toHaveBeenCalled();

    //Check loggedUser variables
    expect(component.user.name).toBe('name2');
    expect(component.user.secondName).toBe('secondName2');

    //Check if update user service is called with parameters
    expect(updateUserProfileSpy).toHaveBeenCalledWith(component.user);
  });

  afterAll(() => {
    //Click update button
    let name = component.form.controls['name'];
    let secondName = component.form.controls['secondName'];
    name.setValue('User1');
    secondName.setValue('User1');
  });
});
