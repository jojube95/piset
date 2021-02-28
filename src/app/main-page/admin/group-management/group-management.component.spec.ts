import {async, ComponentFixture, fakeAsync, flush, TestBed, tick} from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GroupManagementComponent} from './group-management.component';
import {GroupStorageService} from '../../../services/group-storage.service';
import {UserStorageService} from '../../../services/user-storage.service';
import {FormBuilder} from '@angular/forms';
import {DebugElement} from '@angular/core';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';
import {TestService} from '../../../services/test.service';


describe('GroupManagementComponent', () => {
  let component: GroupManagementComponent;
  let fixture: ComponentFixture<GroupManagementComponent>;
  let el: DebugElement;

  let groupStorageService: any;
  let userStorageService: any;
  let testService: any;

  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupManagementComponent ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule, RouterTestingModule],
      providers: [GroupStorageService, UserStorageService, FormBuilder, TestService]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(GroupManagementComponent);
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

  xit('add group show add group form', () => {

  });

  xit('validations and enabled/disabled buttons of new group form', () => {

  });

  xit('add group should add group to list', () => {

  });

  xit('delete group should delete group from list', () => {

  });
});
