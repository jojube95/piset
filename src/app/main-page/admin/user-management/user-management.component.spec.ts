import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import {UserManagementComponent} from './user-management.component';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {GroupStorageService} from '../../../services/group-storage.service';
import {UserStorageService} from '../../../services/user-storage.service';
import {TestService} from '../../../services/test.service';
import {RouterTestingModule} from '@angular/router/testing';
import {Group} from '../../../model/group';
import {User} from '../../../model/user';

describe('UserManagementComponent', () => {
  let component: UserManagementComponent;
  let fixture: ComponentFixture<UserManagementComponent>;
  let el: DebugElement;

  let groupStorageService: any;
  let userStorageService: any;
  let testService: any;

  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserManagementComponent ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule, RouterTestingModule],
      providers: [GroupStorageService, UserStorageService, TestService]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(UserManagementComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      groupStorageService = TestBed.get(GroupStorageService);
      userStorageService = TestBed.get(UserStorageService);
      testService = TestBed.get(TestService);
      httpTestingController = TestBed.get(HttpTestingController);
      fixture.autoDetectChanges()
      component.ngOnInit();
    });


  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('at start no group is selected', () => {
    let groupSelect =  el.query(By.css('#selectGroup'));

    let currentGroup = new Group('Selecciona grupo');
    expect(component.currentGroup).toEqual(currentGroup);

    expect(groupSelect.nativeElement.value).toBe('unselected');
  });

  it('at start no users in select user list', () => {
    let userSelect = el.query(By.css('#selectUser'));

    let currentUser = new User('', '', 'Selecciona usuario', '', false, [], []);

    expect(component.currentUser).toEqual(currentUser);

    expect(userSelect.nativeElement.value).toEqual(currentUser);
  });

  it('at start add user button is disabled', () => {
    let addUserButton = el.query(By.css('#addUserButton'));

    expect(component.groupSelected).toBeFalsy();

    expect(addUserButton.nativeElement.disabled).toBeTruthy();

  });

  it('when group is selected, users group should apear in list',   () => {
    //Get group test data
    let group = testService.getGroupByName('Group1');

    let users = testService.getUsersByGroupId(group._id);

    let spyOnGroupSelect = spyOn(component, 'onGroupSelect').and.callThrough();

    expect(spyOnGroupSelect).not.toHaveBeenCalled();

    let event = {
      detail : {
        value: group
      }
    }

    component.onGroupSelect(event);

    expect(spyOnGroupSelect).toHaveBeenCalled();

    //Mock the http request
    const reqUsers = httpTestingController.expectOne(userStorageService.API_URL + '/api/users/getByGroup' + group._id);
    reqUsers.flush({
      message: "Success",
      users: users
    });

    fixture.detectChanges();

    //Check if users retrive correctly
    let usersList = el.query(By.css('#usersList'));
    expect(userStorageService._usersGroup.getValue().size).toBe(4);
    expect(usersList.nativeElement.children.length).toBe(5);
  });

  it('delete user should delete user from list', () => {
    let spyOnClickDelete = spyOn(component, 'onClickDelete').and.callThrough();

    let group = testService.getGroupByName('Group1');
    let users = testService.getUsersByGroupId(group._id);
    let deleteUser =  users[0];

    //Add mock data to component
    component.currentGroup = group;
    users.forEach((user) => {
      userStorageService._usersGroup.next(userStorageService._usersGroup.getValue().push(user));
    });


    expect(spyOnClickDelete).not.toHaveBeenCalled();

    component.onClickDelete(deleteUser);

    expect(spyOnClickDelete).toHaveBeenCalled();

    const reqUsers = httpTestingController.expectOne(userStorageService.API_URL + '/api/users/deleteUserFromGroup');
    reqUsers.flush({
      message: "Success"
    });

    fixture.detectChanges();

    //Check if users retrive correctly
    let usersList = el.query(By.css('#usersList'));
    expect(userStorageService._usersGroup.getValue()).not.toContain(deleteUser);
    expect(userStorageService._usersWithoutGroup.getValue()).toContain(deleteUser);
    expect(usersList.nativeElement.children.length).toBe(4);

  });

  it('select user to add, and change group should unselect user to add and disable add button', () => {
    let spyGetUsersGroup = spyOn(userStorageService, 'getUsersGroup');
    let spyGetUsersWithoutGroup = spyOn(userStorageService, 'getUsersWithoutGroup');

    expect(spyGetUsersGroup).not.toHaveBeenCalled();
    expect(spyGetUsersWithoutGroup).not.toHaveBeenCalled();

    //Select group
    let group = testService.getGroupByName('Group1');

    let event = {
      detail : {
        value: group
      }
    }

    component.onGroupSelect(event);

    expect(component.currentGroup).toEqual(group);
    expect(spyGetUsersGroup).toHaveBeenCalled();
    expect(spyGetUsersWithoutGroup).toHaveBeenCalled();
    expect(component.currentUser).toEqual(new User('', '', 'Selecciona usuario', '', false, [], []));
    expect(component.groupSelected).toBeTruthy();
    expect(component.userSelected).toBeFalsy();

    //Add users to addUserList
    let users = testService.getUsersByGroupId(group._id);
    let user =  users[0];
    userStorageService._usersWithoutGroup.next(userStorageService._usersWithoutGroup.getValue().push(user));

    //Select user to add
    event = {
      detail : {
        value: user
      }
    }

    component.onUserSelect(event);

    expect(component.currentUser).toEqual(user);

    //Select other group
    event = {
      detail : {
        value: group
      }
    }

    component.onGroupSelect(event);

    expect(component.currentGroup).toEqual(group);
    expect(spyGetUsersGroup).toHaveBeenCalled();
    expect(spyGetUsersWithoutGroup).toHaveBeenCalled();
    expect(component.currentUser).toEqual(new User('', '', 'Selecciona usuario', '', false, [], []));
    expect(component.groupSelected).toBeTruthy();
    expect(component.userSelected).toBeFalsy();

    //addUserList should unselect

    //add button should be disabled
    let addUserButton = el.query(By.css('#addUserButton'));
    expect(addUserButton.nativeElement.disabled).toBeTruthy();

    let userSelect = el.query(By.css('#selectUser'));
    let currentUser = new User('', '', 'Selecciona usuario', '', false, [], []);
    expect(userSelect.nativeElement.value).toEqual(currentUser);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('at start no group is selected', () => {
    let groupSelect =  el.query(By.css('#selectGroup'));
    expect(component.currentGroup).toBeNull();

    expect(groupSelect.nativeElement.value).toBeNull();



  });

  it('at start delete group button is disabled', () => {
    let addGroup = el.query(By.css('#addGroup'));

    expect(addGroup.properties['disabled']).toBeFalsy();
  });

  it('at start add group button is enabled', () => {
    let deleteGroup = el.query(By.css('#deleteGroup'));

    expect(deleteGroup.properties['disabled']).toBeTruthy();
  });

  it('when group is selected, users group should apear in list',   () => {
    //Get group test data
    let group = testService.getGroupByName('Group1');

    let users = testService.getUsersByGroupId(group._id);

    let spyOnGroupSelect = spyOn(component, 'onGroupSelect').and.callThrough();

    expect(spyOnGroupSelect).not.toHaveBeenCalled();

    let event = {
      detail : {
        value: group
      }
    }

    component.onGroupSelect(event);

    expect(spyOnGroupSelect).toHaveBeenCalled();

    //Mock the http request
    const reqUsers = httpTestingController.expectOne(userStorageService.API_URL + '/api/users/getByGroup' + group._id);
    reqUsers.flush({
      message: "Success",
      users: users
    });

    fixture.detectChanges();

    //Check if users retrive correctly
    let usersList = el.query(By.css('#usersList'));
    expect(userStorageService._usersGroup.getValue().size).toBe(4);
    expect(usersList.nativeElement.children.length).toBe(4);
  });

  it('add group show add group form', () => {
    let addGroup = el.query(By.css('#addGroup'));

    expect(el.query(By.css('#newGroupForm'))).toBeFalsy();
    expect(component.add).toBeFalsy();

    addGroup.nativeElement.click();

    expect(el.query(By.css('#newGroupForm'))).toBeTruthy();
    expect(component.add).toBeTruthy();
  });

  it('validations and enabled/disabled buttons of new group form', () => {
    let addGroup = el.query(By.css('#addGroup'));
    let name = component.form.controls['name'];

    addGroup.nativeElement.click();

    let addGroupButton = el.query(By.css('#addGroupButton'));

    expect(addGroupButton.nativeElement.disabled).toBeTruthy();

    name.setValue('');
    fixture.detectChanges();
    expect(name.hasError('required')).toBe(true);

    expect(addGroupButton.nativeElement.disabled).toBeTruthy();

    name.setValue('Test');
    fixture.detectChanges();

    expect(addGroupButton.nativeElement.disabled).toBeFalsy();
  });

  it('back button should hide group form', () => {
    let addGroup = el.query(By.css('#addGroup'));

    addGroup.nativeElement.click();

    let backGroupButton = el.query(By.css('#backGroupButton'));

    expect(backGroupButton.nativeElement.disabled).toBeFalsy();

    backGroupButton.nativeElement.click();

    expect(el.query(By.css('#newGroupForm'))).toBeFalsy();
    expect(el.query(By.css('#addGroupButton'))).toBeFalsy();
    expect(el.query(By.css('#backGroupButton'))).toBeFalsy();
  });

  it('add group should add group to list', () => {
    //Get the form field
    let name = component.form.controls['name'];

    //Spy functions, should call through because we are going to spy the http call and the observable with mock data
    let addGroupSpy = spyOn(component, 'addGroup').and.callThrough();
    let createGroupSpy = spyOn(groupStorageService, 'createGroup').and.callThrough();

    //Define mock data
    let groupMockName = 'TestGroup';

    //Complete form
    name.setValue(groupMockName);

    //SpyMethods to not have been colled yet
    expect(addGroupSpy).not.toHaveBeenCalled();
    expect(createGroupSpy).not.toHaveBeenCalled();

    //Call spy method addGroup
    component.addGroup();

    //SpyMethods should have been called
    expect(addGroupSpy).toHaveBeenCalled();
    expect(createGroupSpy).toHaveBeenCalled();

    //Mock the http request
    const reqUsers = httpTestingController.expectOne(groupStorageService.API_URL + '/api/groups/add');

    reqUsers.flush({
      message: "Success"
    });

    //Check if groups retrive correctly
    expect(groupStorageService._groups.getValue().get(0).name).toBe(groupMockName);
  });

  it('delete group should delete group from list', () => {
    let deleteGroupSpy = spyOn(groupStorageService, 'deleteGroup').and.callThrough();

    //Create mock group
    let groupMock = new Group('TestGroup');

    //Push mock group to gorup list
    groupStorageService._groups.next(groupStorageService._groups.getValue().push(groupMock));
    expect(groupStorageService._groups.getValue().size).toBe(1);

    expect(deleteGroupSpy).not.toHaveBeenCalled();

    //Call delete group
    component.currentGroup = groupMock;
    component.onClickDelete();

    expect(deleteGroupSpy).toHaveBeenCalled();

    //Mock the http request
    const reqUsers = httpTestingController.expectOne(groupStorageService.API_URL + '/api/groups/delete');

    reqUsers.flush({
      message: "Success"
    });

    //Check if deleted group doesnt appear
    expect(groupStorageService._groups.getValue().size).toBe(0);

  });
});
