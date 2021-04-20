import { TestBed } from '@angular/core/testing';

import { UserStorageService } from './user-storage.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestService} from './test.service';
import {RouterTestingModule} from '@angular/router/testing';
import {User} from '../model/user';
import {AuthService} from '../auth/auth.service';

describe('UserStorageService', () => {
  let service: UserStorageService;

  let testService: TestService;
  let authService: any;
  let httpTestingController: HttpTestingController;

  let updateUserProfileSpy: any;
  let getUsersGroupSpy: any;
  let getUsersWithoutGroupSpy: any;
  let addUserToGroupSpy: any;
  let deleteUserFromGroupSpy: any;
  let getUserByMailSpy: any;

  let getCurrentUserSpy: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [TestService, AuthService]
    });
    service = TestBed.inject(UserStorageService);
    testService = TestBed.inject(TestService);
    httpTestingController = TestBed.get(HttpTestingController);
    authService = TestBed.get(AuthService);

    getCurrentUserSpy = spyOn(authService, 'getCurrentUser').and.callFake(() => {
      return testService.getUserByMail('user1@user.com');
    });

    updateUserProfileSpy = spyOn(service, 'updateUserProfile').and.callThrough();
    getUsersGroupSpy = spyOn(service, 'getUsersGroup').and.callThrough();
    getUsersWithoutGroupSpy = spyOn(service, 'getUsersWithoutGroup').and.callThrough();
    addUserToGroupSpy = spyOn(service, 'addUserToGroup').and.callThrough();
    deleteUserFromGroupSpy = spyOn(service, 'deleteUserFromGroup').and.callThrough();
    getUserByMailSpy = spyOn(service, 'getUserByMail').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();

    expect(updateUserProfileSpy).not.toHaveBeenCalled();
    expect(getUsersGroupSpy).not.toHaveBeenCalled();
    expect(getUsersWithoutGroupSpy).not.toHaveBeenCalled();
    expect(addUserToGroupSpy).not.toHaveBeenCalled();
    expect(deleteUserFromGroupSpy).not.toHaveBeenCalled();
    expect(getUserByMailSpy).not.toHaveBeenCalled();
  });

  it('updateUserProfile', () => {
    let mockUser = testService.getUserByMail('user1@user.com');

    //Call service method
    service.updateUserProfile(mockUser as User);

    //Create the mockCall
    const reqUsers = httpTestingController.expectOne(service['API_URL'] + '/api/users/update');

    reqUsers.flush({
      message: 'Succes'
    });

    //Expect request method
    expect(reqUsers.request.method).toEqual('POST');
    //Expect request body
    expect(reqUsers.request.body.user).toEqual(mockUser);
    //Expect request parameters
    expect(reqUsers.request.params.keys().length).toBe(0);
    //Expect the returned data
  });

  it('getUsersGroup', () => {
    //Get mock data
    let mockGroup = testService.getGroupByName('Group1');
    let mockUsers = testService.getUsersByGroupId(testService.getGroupByName('Group1')._id);

    //Call service method
    service.getUsersGroup(mockGroup);

    //Create the mockCall
    const reqUsers = httpTestingController.expectOne(service['API_URL'] + '/api/users/getByGroup' + mockGroup._id);

    reqUsers.flush({
      users: mockUsers
    });

    //Expect request method
    expect(reqUsers.request.method).toEqual('GET');
    //Expect request parameters
    expect(reqUsers.request.params.keys().length).toBe(0);
    //Expect the returned data
    expect(service._usersGroup.getValue().size).toEqual(4);
    expect(service._usersGroup.getValue().get(0).name).toEqual('User1');
    expect(service._usersGroup.getValue().get(1).name).toEqual('User2');
    expect(service._usersGroup.getValue().get(2).name).toEqual('User3');
    expect(service._usersGroup.getValue().get(3).name).toEqual('User4');
  });

  it('getUsersWithoutGroup', () => {
    //Get mock data
    let mockGroup = testService.getGroupByName('Group1');
    let mockUsers = testService.getUsersWithoutGroup(mockGroup._id);

    //Call service method
    service.getUsersWithoutGroup(mockGroup);

    //Create the mockCall
    const reqUsers = httpTestingController.expectOne(service['API_URL'] + '/api/users/getWithoutGroup' + mockGroup._id);

    reqUsers.flush({
      users: mockUsers
    });

    //Expect request method
    expect(reqUsers.request.method).toEqual('GET');
    //Expect request parameters
    expect(reqUsers.request.params.keys().length).toBe(0);
    //Expect the returned data
    expect(service._usersWithoutGroup.getValue().size).toEqual(4);
    expect(service._usersWithoutGroup.getValue().get(0).mail).toEqual('admin@admin.com');
  });

  it('addUserToGroup', () => {
    //Get mock data
    let mockGroup = testService.getGroupByName('Group1');
    let usersGroup = testService.getUsersByGroupId(mockGroup._id);
    let mockUserWithoutGroup = testService.getUsersWithoutGroup(mockGroup._id)[0];

    //Populate initial list with mock data
    service._usersWithoutGroup.next(service._usersWithoutGroup.getValue().push(mockUserWithoutGroup));
    service._usersGroup.next(service._usersGroup.getValue().push(usersGroup[0]));
    service._usersGroup.next(service._usersGroup.getValue().push(usersGroup[1]));
    service._usersGroup.next(service._usersGroup.getValue().push(usersGroup[2]));
    service._usersGroup.next(service._usersGroup.getValue().push(usersGroup[3]));

    //Call service method
    service.addUserToGroup(mockUserWithoutGroup, mockGroup);

    //Create the mockCall
    const reqUsers = httpTestingController.expectOne(service['API_URL'] + '/api/users/addUserToGroup');

    reqUsers.flush({
      message: 'Succes'
    });

    //Expect request method
    expect(reqUsers.request.method).toEqual('POST');
    //Expect request body
    expect(reqUsers.request.body.userId).toEqual(mockUserWithoutGroup._id);
    expect(reqUsers.request.body.groupId).toEqual(mockGroup._id);
    expect(reqUsers.request.body.groupName).toEqual(mockGroup.name);
    //Expect request parameters
    expect(reqUsers.request.params.keys().length).toBe(0);
    //Expect the returned data
    expect(service._usersGroup.getValue().size).toEqual(5);
    expect(service._usersGroup.getValue().get(0).name).toEqual('User1');
    expect(service._usersGroup.getValue().get(1).name).toEqual('User2');
    expect(service._usersGroup.getValue().get(2).name).toEqual('User3');
    expect(service._usersGroup.getValue().get(3).name).toEqual('User4');
    expect(service._usersGroup.getValue().get(4).name).toEqual('Admin');

    expect(service._usersWithoutGroup.getValue().size).toEqual(0);
  });

  it('deleteUserFromGroup', () => {
    //Get mock data
    let mockGroup = testService.getGroupByName('Group1');
    let usersGroup = testService.getUsersByGroupId(mockGroup._id);
    let mockUserDeleted = usersGroup[0];

    //Populate initial list with mock data
    service._usersGroup.next(service._usersGroup.getValue().push(usersGroup[0]));
    service._usersGroup.next(service._usersGroup.getValue().push(usersGroup[1]));
    service._usersGroup.next(service._usersGroup.getValue().push(usersGroup[2]));
    service._usersGroup.next(service._usersGroup.getValue().push(usersGroup[3]));

    //Call service method
    service.deleteUserFromGroup(mockUserDeleted, mockGroup);

    //Create the mockCall
    const reqUsers = httpTestingController.expectOne(service['API_URL'] + '/api/users/deleteUserFromGroup');

    reqUsers.flush({
      message: 'Succes'
    });

    //Expect request method
    expect(reqUsers.request.method).toEqual('POST');
    //Expect request body
    expect(reqUsers.request.body.userId).toEqual(mockUserDeleted._id);
    expect(reqUsers.request.body.groupId).toEqual(mockGroup._id);
    //Expect request parameters
    expect(reqUsers.request.params.keys().length).toBe(0);
    //Expect the returned data
    expect(service._usersGroup.getValue().size).toEqual(3);
    expect(service._usersGroup.getValue().get(0).name).toEqual('User2');
    expect(service._usersGroup.getValue().get(1).name).toEqual('User3');
    expect(service._usersGroup.getValue().get(2).name).toEqual('User4');

    expect(service._usersWithoutGroup.getValue().size).toEqual(1);
    expect(service._usersWithoutGroup.getValue().get(0).name).toEqual('User1');
  });

  it('getUserByMail', () => {
    //Get mock data
    let userMock = testService.getUserByMail('user1@user.com');

    //Call service method
    service.getUserByMail('user1@user.com').subscribe(res => {});

    //Create the mockCall
    const reqUser = httpTestingController.expectOne(service['API_URL'] + '/api/users/getByEmail' + userMock.mail);

    reqUser.flush({
      message: "Success",
      users: [userMock]
    });

    //Expect request method
    expect(reqUser.request.method).toEqual('GET');
    //Expect request parameters
    expect(reqUser.request.params.keys().length).toBe(0);
  });

  afterEach(() => {
    httpTestingController.verify();
  })
});
