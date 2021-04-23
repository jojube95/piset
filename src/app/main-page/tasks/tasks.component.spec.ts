import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TasksComponent} from './tasks.component';
import {DebugElement} from '@angular/core';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {UserStorageService} from '../../services/user-storage.service';
import {TestService} from '../../services/test.service';
import {TaskStorageService} from '../../services/task-storage.service';
import {By} from '@angular/platform-browser';
import {Group} from '../../model/group';

xdescribe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let el: DebugElement;

  let userStorageService: any;
  let taskStorageService: any;
  let testService: any;

  let httpTestingController: any;

  let getCurrentUserSpy: any;
  let getUsersGroupSpy: any;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ TasksComponent ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule, RouterTestingModule],
      providers: [UserStorageService, TaskStorageService, TestService]
    }).compileComponents().then(() => {
      userStorageService = TestBed.get(UserStorageService);
      taskStorageService = TestBed.get(TaskStorageService);
      httpTestingController = TestBed.get(HttpTestingController);
      testService = TestBed.get(TestService);

      getCurrentUserSpy = spyOn(userStorageService, 'getCurrentUser').and.callFake(() => {
        return testService.getUserByMail('user1@user.com');
      });

      getUsersGroupSpy = spyOn(userStorageService, 'getUsersGroup').and.callThrough();

      fixture = TestBed.createComponent(TasksComponent);
      el = fixture.debugElement;
      component = fixture.componentInstance;
      fixture.detectChanges();
      fixture.autoDetectChanges();
    });



  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initial variable and calls', () => {
    const mockUser = testService.getUserByMail('user1@user.com');

    expect(component.loggedUser).toEqual(mockUser);
    expect(getCurrentUserSpy).toHaveBeenCalled();
    expect(component.loading).toBeFalsy();
    expect(component.isUserInGroup).toBeTruthy();
    expect(getUsersGroupSpy).toHaveBeenCalled();
  });

  it('show user dont have group message if user dont have group', () => {
    component.loggedUser = testService.getUserByMail('admin@admin.com');
    component.isUserInGroup = false;

    fixture.detectChanges();

    expect(component.loggedUser.groups).toBeNull();
    expect(component.isUserInGroup).toBeFalsy();

    expect(el.query(By.css('#withoutGroupLabel')).nativeElement.textContent).toBe('User don\'t have a group');
  });

  it('show user current group', () => {
    // Initialy user logged is user1@user.com
    expect(component.loggedUser.groups[0].group.name).toBe('Group1');
    expect(el.query(By.css('#withGroupLabel')).nativeElement.textContent).toBe('Group: Group1');
    });

  it('show user list of current user group', () => {
    // Initialy user logged is user1@user.com
    // Get users group mock data
    const mockUsersGroup = testService.getUsersByGroupId(component.loggedUser.groups[0].group._id);

    // userStorageService.getUsersGroup(new Group(component.loggedUser.groupId, null, null));

    expect(getUsersGroupSpy).toHaveBeenCalledWith(new Group('', component.loggedUser.groups[0].group._id));
    expect(getUsersGroupSpy).toHaveBeenCalled();

    // Mock http request
    const reqUsers = httpTestingController.expectOne(userStorageService.API_URL + '/api/users/getByGroup' + component.loggedUser.groups[0].group._id);
    reqUsers.flush({
      message: 'Success',
      users: mockUsersGroup
    });

    fixture.detectChanges();

    // Check users list
    expect(el.query(By.css('#userSelect')).children[0].nativeElement.textContent).toBe('User1');
    expect(el.query(By.css('#userSelect')).children[1].nativeElement.textContent).toBe('User2');
    expect(el.query(By.css('#userSelect')).children[2].nativeElement.textContent).toBe('User3');
    expect(el.query(By.css('#userSelect')).children[3].nativeElement.textContent).toBe('User4');

  });

  it('show selected user task', () => {
    // Spy methods
    const getTaskByUserSpy = spyOn(taskStorageService, 'getTaskByUser').and.callThrough();

    // Get mock data
    const mockUser = testService.getUserByMail('user1@user.com');
    const mockTask = testService.getTaskByUserId(mockUser._id);

    const event = {
      detail : {
        value: mockUser
      }
    };
    // Call method
    component.onUserSelect(event);

    // Mock http request
    const reqTask = httpTestingController.expectOne(taskStorageService.API_URL + '/api/tasks/getByUser' + mockUser._id);
    reqTask.flush({
      message: 'Success',
      task: mockTask
    });


    fixture.detectChanges();

    // Check task label
    const taskLabel = el.query(By.css('#userTask'));

    expect(taskLabel.nativeElement.textContent).toBe('Task1');
  });


});
