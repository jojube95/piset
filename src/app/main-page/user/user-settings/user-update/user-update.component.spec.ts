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
    fixture.detectChanges();

    const nameInput = el.query(By.css('#name'));
    const secondNameInput = el.query(By.css('#secondName'));

    expect(nameInput.nativeElement.value).toEqual(component.user.name);
    expect(secondNameInput.nativeElement.value).toEqual(component.user.secondName);
  });

  it('form validation and button enable/diabled', () => {
    const name = component.form.controls['name'];
    const secondName = component.form.controls['secondName'];

    // Form initial validation
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

  it('click update user should call service funtion', () => {
    const onUpdateSpy = spyOn(component, 'update').and.callThrough();
    const updateUserSpy = spyOn(userStorageService, 'updateUserProfile');


    expect(onUpdateSpy).not.toHaveBeenCalled();
    expect(updateUserSpy).not.toHaveBeenCalled();

    component.update();

    expect(onUpdateSpy).toHaveBeenCalled();
    expect(updateUserSpy).toHaveBeenCalledWith(component.user);
  });


  afterAll(() => {
    const onUpdateSpy = spyOn(component, 'update').and.callThrough();
    // Click update button
    const name = component.form.controls['name'];
    const secondName = component.form.controls['secondName'];
    name.setValue('User1');
    secondName.setValue('User1');
    fixture.detectChanges();

    component.update();
  });
});
