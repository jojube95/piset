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

describe('UserUpdateComponent', () => {
  let component: UserUpdateComponent;
  let fixture: ComponentFixture<UserUpdateComponent>;
  let el: DebugElement;

  let userStorageService: any;
  let authService: any;
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

      fixture = TestBed.createComponent(UserUpdateComponent);
      component = fixture.componentInstance;

      component.user = testService.getUserByMail('user1@user.com');

      el = fixture.debugElement;
      fixture.detectChanges();
    });


  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show user data', () =>  {
    let nameInput = el.query(By.css('#name'));
    let secondNameInput = el.query(By.css('#secondName'));

    expect(nameInput.nativeElement.value).toEqual('User1');
    expect(secondNameInput.nativeElement.value).toEqual('User1');
  });

  it('form validation and button enable/diabled', () => {
    let name = component.form.controls['name'];
    let secondName = component.form.controls['secondName'];

    //Form initial validation
    expect(component.form.valid).toBeTruthy();
    expect(component.form.dirty).toBeFalsy();
    expect(el.query(By.css('#updateButton')).nativeElement.disabled).toBeTruthy();

    name.setValue('');
    secondName.setValue('');

    fixture.detectChanges();

    expect(name.hasError('required')).toBe(true);
    expect(secondName.hasError('required')).toBe(true);
    expect(component.form.valid).toBeFalsy();
    expect(el.query(By.css('#updateButton')).nativeElement.disabled).toBeTruthy();

    name.setValue('name2');
    secondName.setValue('secondName2');

    fixture.detectChanges();

    expect(name.hasError('required')).toBe(false);
    expect(secondName.hasError('required')).toBe(false);
    expect(component.form.valid).toBeTruthy();
  });

  it('change name and second name', () => {
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
