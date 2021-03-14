import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TasksComponent} from './tasks.component';
import {DebugElement} from '@angular/core';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {UserStorageService} from '../../services/user-storage.service';
import {TestService} from '../../services/test.service';
import {SubtaskStorageService} from '../../services/subtask-storage.service';
import {TaskStorageService} from '../../services/task-storage.service';
import {By} from '@angular/platform-browser';
import {Group} from '../../model/group';
import {User} from '../../model/user';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let el: DebugElement;

  let userStorageService: any;
  let taskStorageService: any;
  let subtaskStorageService: any;
  let testService: any;

  let httpTestingController: any;

  let getCurrentUserSpy: any;
  let getUsersGroupSpy: any;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [ TasksComponent ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule, RouterTestingModule],
      providers: [UserStorageService, TaskStorageService, SubtaskStorageService, TestService]
    }).compileComponents().then(() => {
      userStorageService = TestBed.get(UserStorageService);
      taskStorageService = TestBed.get(TaskStorageService);
      subtaskStorageService = TestBed.get(SubtaskStorageService);
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
    let mockUser = testService.getUserByMail('user1@user.com');

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

    expect(component.loggedUser.groupId).toBeNull();
    expect(component.isUserInGroup).toBeFalsy();

    expect(el.query(By.css('#withoutGroupLabel')).nativeElement.textContent).toBe("User don't have a group");
  });

  it('show user current group', () => {
    //Initialy user logged is user1@user.com
    expect(component.loggedUser.groupName).toBe('Group1');
    expect(el.query(By.css('#withGroupLabel')).nativeElement.textContent).toBe("Group: Group1");
    });

  it('show user list of current user group', () => {
    //Initialy user logged is user1@user.com
    //Get users group mock data
    let mockUsersGroup = testService.getUsersByGroupId(component.loggedUser.groupId);

    //userStorageService.getUsersGroup(new Group(component.loggedUser.groupId, null, null));

    expect(getUsersGroupSpy).toHaveBeenCalledWith(new Group(component.loggedUser.groupId, null));
    expect(getUsersGroupSpy).toHaveBeenCalled();

    //Mock http request
    const reqUsers = httpTestingController.expectOne(userStorageService.API_URL + '/api/users/getByGroup' + component.loggedUser.groupId);
    reqUsers.flush({
      message: "Success",
      users: mockUsersGroup
    });

    fixture.detectChanges();

    //Check users list
    expect(el.query(By.css('#userSelect')).children[0].nativeElement.textContent).toBe('User1');
    expect(el.query(By.css('#userSelect')).children[1].nativeElement.textContent).toBe('User2');
    expect(el.query(By.css('#userSelect')).children[2].nativeElement.textContent).toBe('User3');
    expect(el.query(By.css('#userSelect')).children[3].nativeElement.textContent).toBe('User4');

  });

  it('show selected user task and subtasks', () => {
    //Spy methods
    let getTaskByUserSpy = spyOn(taskStorageService, 'getTaskByUser').and.callThrough();
    let getTaskSubtasksSpy = spyOn(subtaskStorageService, 'getTaskSubtasks').and.callThrough();

    //Get mock data
    let mockUser = testService.getUserByMail('user1@user.com');
    let mockTask = testService.getTaskByUserId(mockUser._id);
    let mockSubtasks = testService.getSubtasksByTaskId(mockTask._id);

    //Call method
    component.selectUser(mockUser);

    //Mock http request
    const reqTask = httpTestingController.expectOne(taskStorageService.API_URL + '/api/tasks/getByUser' + mockUser._id);
    reqTask.flush({
      message: "Success",
      task: mockTask
    });

    const reqSubtask = httpTestingController.expectOne(taskStorageService.API_URL + '/api/subtasks/getByTask' + mockTask._id);
    reqSubtask.flush({
      message: "Success",
      subtasks: mockSubtasks
    });

    fixture.detectChanges();

    //Check task label
    let taskLabel = el.query(By.css('#userTask'));
    let subtasksList = el.query(By.css('#userSubtasks'));

    expect(taskLabel.nativeElement.textContent).toBe('Task1');

    expect(subtasksList.children.length).toBe(2);

    expect(subtasksList.children[0].children[0].nativeElement.textContent).toBe('Subtask1');
    expect(subtasksList.children[1].children[0].nativeElement.textContent).toBe('Subtask2');

    expect(subtasksList.children[0].children[1].nativeElement.textContent).toBe('Subtask1');
    expect(subtasksList.children[1].children[1].nativeElement.textContent).toBe('Subtask2');

    expect(subtasksList.children[0].children[2].nativeElement.checked).toBeTruthy();
    expect(subtasksList.children[1].children[2].nativeElement.checked).toBeTruthy();
  });

  it('current user can check and uncheck subtask done', () => {
    //Spy methods
    let getTaskByUserSpy = spyOn(taskStorageService, 'getTaskByUser').and.callThrough();
    let getTaskSubtasksSpy = spyOn(subtaskStorageService, 'getTaskSubtasks').and.callThrough();
    let updateSubtaskSpy = spyOn(subtaskStorageService, 'updateSubtask').and.callThrough();
    let onChangeSubtask = spyOn(component, 'onChangeSubtask').and.callThrough();

    //Get mock data
    let mockUser = testService.getUserByMail('user1@user.com');
    let mockTask = testService.getTaskByUserId(mockUser._id);
    let mockSubtasks = testService.getSubtasksByTaskId(mockTask._id);

    //Call method
    component.selectUser(mockUser);

    //Mock http request
    const reqTask = httpTestingController.expectOne(taskStorageService.API_URL + '/api/tasks/getByUser' + mockUser._id);
    reqTask.flush({
      message: "Success",
      task: mockTask
    });

    const reqSubtask = httpTestingController.expectOne(taskStorageService.API_URL + '/api/subtasks/getByTask' + mockTask._id);
    reqSubtask.flush({
      message: "Success",
      subtasks: mockSubtasks
    });

    fixture.detectChanges();

    expect(updateSubtaskSpy).not.toHaveBeenCalled();
    expect(onChangeSubtask).not.toHaveBeenCalled();
    expect(mockSubtasks[0].done).toBeTruthy();

    //Click uncheck task
    let subtasksList = el.query(By.css('#userSubtasks'));
    let checkbox = subtasksList.children[0].children[2];

    checkbox.nativeElement.dispatchEvent(new Event('ionChange'));

    fixture.detectChanges();

    //Check method and service called
    expect(updateSubtaskSpy).toHaveBeenCalled();
    expect(onChangeSubtask).toHaveBeenCalled();

  });

  it('current user admin group can check and uncheck other subtask user', () => {
    //Spy methods
    let getTaskByUserSpy = spyOn(taskStorageService, 'getTaskByUser').and.callThrough();
    let getTaskSubtasksSpy = spyOn(subtaskStorageService, 'getTaskSubtasks').and.callThrough();

    //Logged user is 'user1@user.com'
    //Get mock data
    let mockUser = testService.getUserByMail('user2@user.com');
    let mockTask = testService.getTaskByUserId(mockUser._id);
    let mockSubtasks = testService.getSubtasksByTaskId(mockTask._id);

    //Call method
    component.selectUser(mockUser);

    //Mock http request
    const reqTask = httpTestingController.expectOne(taskStorageService.API_URL + '/api/tasks/getByUser' + mockUser._id);
    reqTask.flush({
      message: "Success",
      task: mockTask
    });

    const reqSubtask = httpTestingController.expectOne(taskStorageService.API_URL + '/api/subtasks/getByTask' + mockTask._id);
    reqSubtask.flush({
      message: "Success",
      subtasks: mockSubtasks
    });

    fixture.detectChanges();

    //Check if checkboxes are enabled
    let subtasksList = el.query(By.css('#userSubtasks'));
    let checkbox1 = subtasksList.children[0].children[2];
    let checkbox2 = subtasksList.children[0].children[2];

    expect(checkbox1.nativeElement.disabled).toBeFalsy();
    expect(checkbox2.nativeElement.disabled).toBeFalsy();
  });

  it('current user no-admin group cant check and uncheck other subtask user', () => {
    //Spy methods
    let getTaskByUserSpy = spyOn(taskStorageService, 'getTaskByUser').and.callThrough();
    let getTaskSubtasksSpy = spyOn(subtaskStorageService, 'getTaskSubtasks').and.callThrough();

    //Logged user is 'user2@user.com'
    component.loggedUser = testService.getUserByMail('user2@user.com');

    //Get mock data
    let mockUser = testService.getUserByMail('user1@user.com');
    let mockTask = testService.getTaskByUserId(mockUser._id);
    let mockSubtasks = testService.getSubtasksByTaskId(mockTask._id);

    //Call method
    component.selectUser(mockUser);

    //Mock http request
    const reqTask = httpTestingController.expectOne(taskStorageService.API_URL + '/api/tasks/getByUser' + mockUser._id);
    reqTask.flush({
      message: "Success",
      task: mockTask
    });

    const reqSubtask = httpTestingController.expectOne(taskStorageService.API_URL + '/api/subtasks/getByTask' + mockTask._id);
    reqSubtask.flush({
      message: "Success",
      subtasks: mockSubtasks
    });

    fixture.detectChanges();

    //Check if checkboxes are disabled
    let subtasksList = el.query(By.css('#userSubtasks'));
    let checkbox1 = subtasksList.children[0].children[2];
    let checkbox2 = subtasksList.children[0].children[2];

    expect(checkbox1.nativeElement.disabled).toBeTruthy();
    expect(checkbox2.nativeElement.disabled).toBeTruthy();
  });


});
