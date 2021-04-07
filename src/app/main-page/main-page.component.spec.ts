import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {IonicModule, MenuController} from '@ionic/angular';
import { MainPageComponent} from './main-page.component';
import {Router} from '@angular/router';
import {DebugElement} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '../auth/auth.service';
import {By} from '@angular/platform-browser';
import {HttpClientTestingModule} from '@angular/common/http/testing';


describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  let el: DebugElement;
  let authService: any;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPageComponent],
      imports: [IonicModule.forRoot(), RouterTestingModule, HttpClientTestingModule],
      providers: [AuthService, MenuController]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(MainPageComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      authService = TestBed.get(AuthService);
      router = TestBed.get(Router);
      spyOn(router, 'navigate');
      fixture.autoDetectChanges()
      component.ngOnInit();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('admin options visibility if/not admin user', () => {

  });

  xit('test options visibility if/not admin user and test environment', () => {

  });

  it('logOut should navigate to logIn and call logOut service', () => {
    const logOut = spyOn(component, 'logOut').and.callThrough();
    const authServiceLogOutSpy = spyOn(authService, 'signOut').and.callThrough();

    expect(logOut).not.toHaveBeenCalled();
    expect(authServiceLogOutSpy).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalledWith(['/signIn']);

    let titleButton = el.query(By.css('#logOut'));

    titleButton.nativeElement.click();

    fixture.detectChanges();

    expect(logOut).toHaveBeenCalled();
    expect(authServiceLogOutSpy).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/signIn']);
  });

  it('click on option should navigate on it', () => {
    const onClickTasks = spyOn(component, 'onClickTasks').and.callThrough();
    const onClickHistory = spyOn(component, 'onClickHistory').and.callThrough();
    const onClickTaskManagement = spyOn(component, 'onClickTaskManagement').and.callThrough();
    const onClickUserManagement = spyOn(component, 'onClickUserManagement').and.callThrough();
    const onClickGroupManagement = spyOn(component, 'onClickGroupManagement').and.callThrough();
    const onClickTest = spyOn(component, 'onClickTest').and.callThrough();
    const onClickUserInfo = spyOn(component, 'onClickUserInfo').and.callThrough();
    const onClickUserSettings = spyOn(component, 'onClickUserSettings').and.callThrough();
    const onClickUserInvitations = spyOn(component, 'onClickUserInvitations').and.callThrough();

    let clickTasks = el.query(By.css('#clickTasks'));
    let clickHistory = el.query(By.css('#clickHistory'));
    let clickTaskManagement = el.query(By.css('#clickTaskManagement'));
    let clickUserManagement = el.query(By.css('#clickUserManagement'));
    let clickGroupManagement = el.query(By.css('#clickGroupManagement'));
    let clickTest = el.query(By.css('#clickTest'));
    let clickUserInfo = el.query(By.css('#clickUserInfo'));
    let clickUserSettings = el.query(By.css('#clickUserSettings'));
    let clickUserInvitations = el.query(By.css('#clickUserInvitations'));

    expect(onClickTasks).not.toHaveBeenCalled();
    expect(onClickHistory).not.toHaveBeenCalled();
    expect(onClickTaskManagement).not.toHaveBeenCalled();
    expect(onClickUserManagement).not.toHaveBeenCalled();
    expect(onClickGroupManagement).not.toHaveBeenCalled();
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

    clickGroupManagement.nativeElement.click();
    fixture.detectChanges();
    expect(onClickGroupManagement).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/main/admin/groupManagement']);

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
