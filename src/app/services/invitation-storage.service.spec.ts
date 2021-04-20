import { TestBed } from '@angular/core/testing';
import { InvitationStorageService } from './invitation-storage.service';
import {TestService} from './test.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Invitation} from '../model/invitation';

describe('InvitationStorageService', () => {
  let service: InvitationStorageService;

  let testService: TestService;
  let httpTestingController: HttpTestingController;

  let loadInvitationsSpy: any;
  let inviteUserSpy: any;
  let acceptInvitationSpy: any;
  let declineInvitationSpy: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [TestService]
    });
    service = TestBed.inject(InvitationStorageService);
    testService = TestBed.inject(TestService);
    httpTestingController = TestBed.get(HttpTestingController);

    loadInvitationsSpy = spyOn(service, 'loadInvitations').and.callThrough();
    inviteUserSpy = spyOn(service, 'inviteUser').and.callThrough();
    acceptInvitationSpy = spyOn(service, 'acceptInvitation').and.callThrough();
    declineInvitationSpy = spyOn(service, 'declineInvitation').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('loadInvitations', () => {
    //Get mock data
    let mockUser = testService.getUserByMail('user1@user.com');
    let mockInvitations = testService.getInvitationsByUserId(mockUser._id);

    //Call service method
    service.loadInvitations(mockUser);

    //Create the mockCall
    const reqInvitations = httpTestingController.expectOne(service['API_URL'] + '/api/invitations/getByUser' + mockUser._id);

    reqInvitations.flush({
      invitations: mockInvitations
    });

    //Expect request method
    expect(reqInvitations.request.method).toEqual('GET');
    //Expect request parameters
    expect(reqInvitations.request.params.keys().length).toBe(0);
    //Expect the returned data
    expect(service._userInvitations.getValue().size).toEqual(1);
    expect(service._userInvitations.getValue().get(0).groupName).toEqual('Group1');
  });

  it('inviteUser', () => {
    let mockInvitation = testService.getInvitationsByUserId(testService.getUserByMail('user1@user.com')._id)[0];

    //Call service method
    service.inviteUser(mockInvitation as unknown as Invitation);

    //Create the mockCall
    const reqInvitations = httpTestingController.expectOne(service['API_URL'] + '/api/invitations/invite');

    reqInvitations.flush({
      message: 'Succes'
    });

    //Expect request method
    expect(reqInvitations.request.method).toEqual('POST');
    //Expect request body
    expect(reqInvitations.request.body.invitation).toEqual(mockInvitation);
    //Expect request parameters
    expect(reqInvitations.request.params.keys().length).toBe(0);
    //Expect the returned data
    expect(service._userInvitations.getValue().size).toEqual(1);
    expect(service._userInvitations.getValue().get(0).groupName).toEqual('Group1');
  });

  it('acceptInvitation', () => {
    //Mock _userInvitation list with mock data
    let mockInvitation = testService.getInvitationsByUserId(testService.getUserByMail('user1@user.com')._id)[0];
    service._userInvitations.next(service._userInvitations.getValue().push(mockInvitation));


    //Call service method
    service.acceptInvitation(mockInvitation as unknown as Invitation);

    //Create the mockCall
    const reqInvitations = httpTestingController.expectOne(service['API_URL'] + '/api/invitations/accept');

    reqInvitations.flush({
      invitations: mockInvitation,
      message: 'Succes'
    });

    //Expect request method
    expect(reqInvitations.request.method).toEqual('POST');
    //Expect request body
    expect(reqInvitations.request.body.invitation).toEqual(mockInvitation);
    //Expect request parameters
    expect(reqInvitations.request.params.keys().length).toBe(0);
    //Expect the returned data
    expect(service._userInvitations.getValue().size).toEqual(0);
  });

  it('declineInvitation', () => {
    //Mock _userInvitation list with mock data
    let mockInvitation = testService.getInvitationsByUserId(testService.getUserByMail('user1@user.com')._id)[0];
    service._userInvitations.next(service._userInvitations.getValue().push(mockInvitation));


    //Call service method
    service.declineInvitation(mockInvitation as unknown as Invitation);

    //Create the mockCall
    const reqInvitations = httpTestingController.expectOne(service['API_URL'] + '/api/invitations/decline');

    reqInvitations.flush({
      invitations: mockInvitation,
      message: 'Succes'
    });

    //Expect request method
    expect(reqInvitations.request.method).toEqual('POST');
    //Expect request body
    expect(reqInvitations.request.body.invitation).toEqual(mockInvitation);
    //Expect request parameters
    expect(reqInvitations.request.params.keys().length).toBe(0);
    //Expect the returned data
    expect(service._userInvitations.getValue().size).toEqual(0);
  });

  afterEach(() => {
    httpTestingController.verify();
  })
});
