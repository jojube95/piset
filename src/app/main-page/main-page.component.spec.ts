import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {IonicModule, MenuController} from '@ionic/angular';
import { MainPageComponent} from './main-page.component';
import {Router} from '@angular/router';
import {DebugElement} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '../auth/auth.service';
import {By} from '@angular/platform-browser';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestService} from '../services/test.service';


describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  let el: DebugElement;
  let authService: any;
  let router: Router;
  let testService: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPageComponent],
      imports: [IonicModule.forRoot(), RouterTestingModule, HttpClientTestingModule],
      providers: [AuthService, MenuController, TestService]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(MainPageComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      authService = TestBed.get(AuthService);
      router = TestBed.get(Router);
      testService = TestBed.get(TestService);
      spyOn(router, 'navigate');
      spyOn(authService, 'getCurrentUser').and.returnValue(testService.getUserByMail('user1@user.com'));
      spyOn(authService, 'signOut').and.callFake(() => {
        router.navigate(['/signIn']);
      });
      fixture.autoDetectChanges();
      component.ngOnInit();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('admin options visibility not admin user', () => {
    component.userLogged = testService.getUserByMail('user1@user.com');

    fixture.detectChanges();

    const clickTaskManagement = el.query(By.css('#clickTaskManagement'));
    const clickUserManagement = el.query(By.css('#clickUserManagement'));
    const clickTest = el.query(By.css('#clickTest'));

    expect(clickTaskManagement).toBeNull();
    expect(clickUserManagement).toBeNull();
    expect(clickTest).toBeNull();
  });

  it('admin options visibility admin user', () => {
    component.userLogged = testService.getUserByMail('admin@admin.com');

    fixture.detectChanges();

    const clickTaskManagement = el.query(By.css('#clickTaskManagement'));
    const clickUserManagement = el.query(By.css('#clickUserManagement'));
    const clickTest = el.query(By.css('#clickTest'));

    expect(clickTaskManagement).toBeTruthy();
    expect(clickUserManagement).toBeTruthy();
    expect(clickTest).toBeTruthy();
  });

  it('test options visibility if admin user and/not test environment', () => {
    component.userLogged = testService.getUserByMail('admin@admin.com');
    component['production'] = false;

    fixture.detectChanges();

    expect(el.query(By.css('#clickTest'))).toBeTruthy();

    component['production'] = true;

    fixture.detectChanges();

    expect(el.query(By.css('#clickTest'))).toBeNull();
  });

  it('logOut should navigate to logIn and call logOut service', () => {
    const logOut = spyOn(component, 'logOut').and.callThrough();

    expect(logOut).not.toHaveBeenCalled();
    expect(authService.signOut).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalledWith(['/signIn']);

    const titleButton = el.query(By.css('#logOut'));

    titleButton.nativeElement.click();

    fixture.detectChanges();

    expect(logOut).toHaveBeenCalled();
    expect(authService.signOut).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/signIn']);
  });

  it('click on option should navigate on it', () => {
    component.userLogged = testService.getUserByMail('admin@admin.com');
    component['production'] = false;

    fixture.detectChanges();

    const onClickTasks = spyOn(component, 'onClickTasks').and.callThrough();
    const onClickHistory = spyOn(component, 'onClickHistory').and.callThrough();
    const onClickTaskManagement = spyOn(component, 'onClickTaskManagement').and.callThrough();
    const onClickUserManagement = spyOn(component, 'onClickUserManagement').and.callThrough();
    const onClickTest = spyOn(component, 'onClickTest').and.callThrough();
    const onClickUserInfo = spyOn(component, 'onClickUserInfo').and.callThrough();
    const onClickUserSettings = spyOn(component, 'onClickUserSettings').and.callThrough();
    const onClickUserInvitations = spyOn(component, 'onClickUserInvitations').and.callThrough();

    const clickTasks = el.query(By.css('#clickTasks'));
    const clickHistory = el.query(By.css('#clickHistory'));
    const clickTaskManagement = el.query(By.css('#clickTaskManagement'));
    const clickUserManagement = el.query(By.css('#clickUserManagement'));
    const clickTest = el.query(By.css('#clickTest'));
    const clickUserInfo = el.query(By.css('#clickUserInfo'));
    const clickUserSettings = el.query(By.css('#clickUserSettings'));
    const clickUserInvitations = el.query(By.css('#clickUserInvitations'));

    expect(onClickTasks).not.toHaveBeenCalled();
    expect(onClickHistory).not.toHaveBeenCalled();
    expect(onClickTaskManagement).not.toHaveBeenCalled();
    expect(onClickUserManagement).not.toHaveBeenCalled();
    expect(onClickTest).not.toHaveBeenCalled();
    expect(onClickUserInfo).not.toHaveBeenCalled();
    expect(onClickUserSettings).not.toHaveBeenCalled();
    expect(onClickUserInvitations).not.toHaveBeenCalled();

    clickTasks.nativeElement.click();
    fixture.detectChanges();
    expect(onClickTasks).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/main/tasks']);

    clickHistory.nativeElement.click();
    fixture.detectChanges();
    expect(onClickHistory).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/main/history']);

    clickTaskManagement.nativeElement.click();
    fixture.detectChanges();
    expect(onClickTaskManagement).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/main/admin/taskManagement']);

    clickUserManagement.nativeElement.click();
    fixture.detectChanges();
    expect(onClickUserManagement).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/main/admin/userManagement']);

    clickTest.nativeElement.click();
    fixture.detectChanges();
    expect(onClickTest).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/main/admin/test']);

    clickUserInfo.nativeElement.click();
    fixture.detectChanges();
    expect(onClickUserInfo).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/main/user/info']);

    clickUserSettings.nativeElement.click();
    fixture.detectChanges();
    expect(onClickUserSettings).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/main/user/settings']);

    clickUserInvitations.nativeElement.click();
    fixture.detectChanges();
    expect(onClickUserInvitations).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/main/user/invitations']);
  });
});
