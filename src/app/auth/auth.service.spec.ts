import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {TestService} from '../services/test.service';
import {Router} from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;

  let router: Router;
  let testService: TestService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [TestService]
    });
    testService = TestBed.inject(TestService);

    service = TestBed.inject(AuthService);
    service['currentUser'] = testService.getUserByMail('user1@user.com');

    httpTestingController = TestBed.get(HttpTestingController);
    router = TestBed.get(Router);
    spyOn(router, 'navigate');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('signOut should cleans tokens and navigaes to signIn', () => {
    const clearAuthDataSpy = spyOn(service, 'clearAuthData');

    //Call signOut
    service.signOut();

    //Expects
    expect(service['token']).toBeNull();
    expect(clearAuthDataSpy).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/signIn']);
  });

  it('signupUser', () => {
    //Get mockUser
    let mockUser = testService.getUserByMail('user1@user.com');

    //Call service method
    service.signupUser(mockUser);

    //Create the mockCall
    const reqUser = httpTestingController.expectOne(service['API_URL'] + '/api/users/signup');

    reqUser.flush({
      message: 'Success'
    });

    //Expect request method
    expect(reqUser.request.method).toEqual('POST');
    //Expect request parameters
    expect(reqUser.request.params.keys().length).toBe(0);
    //Expect request body
    expect(reqUser.request.body).toEqual(mockUser);
  });

  it('signinUser', () => {
    //Get mockUser
    let mockUser = testService.getUserByMail('user1@user.com');
    let mockToken = '123456789';

    //Spy method
    const saveAuthDataSpy = spyOn(service, 'saveAuthData');

    //Call service method
    service.signinUser(mockUser.mail, mockUser.password);

    //Create the mockCall
    const reqUser = httpTestingController.expectOne(service['API_URL'] + '/api/users/signin');

    reqUser.flush({
      user: mockUser,
      token: mockToken
    });

    //Expect request method
    expect(reqUser.request.method).toEqual('POST');
    //Expect request parameters
    expect(reqUser.request.params.keys().length).toBe(0);
    //Expect request body
    expect(reqUser.request.body.mail).toEqual(mockUser.mail);
    expect(reqUser.request.body.password).toEqual(mockUser.password);

    //Expect after httpcall
    expect(service['token']).toEqual(mockToken);
    expect(service['currentUser'].name).toEqual(mockUser.name);
    expect(service['currentUser'].secondName).toEqual(mockUser.secondName);
    expect(service['currentUser'].mail).toEqual(mockUser.mail);
    expect(service['currentUser'].password).toEqual(mockUser.password);
    expect(saveAuthDataSpy).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/main']);
  });

  it('getAuthData', () => {
    //Set mock data
    let token = '12345';
    let user = service['currentUser'];

    localStorage.setItem('token', token);
    localStorage.setItem('currentUser', JSON.stringify(user));

    let res = service.getAuthData();

    expect(res).toEqual({token: token, currentUser: user});

    localStorage.clear();

    res = service.getAuthData();

    expect(res).toBeUndefined();
  });

  it('saveAuthData', () => {
    //Set mock data
    let token = '12345';
    let user = service['currentUser'];

    service.saveAuthData(token, user);

    expect(localStorage.getItem('token')).toEqual(token);
    expect(localStorage.getItem('currentUser')).toEqual(JSON.stringify(user));
  });

  it('getCurrentUser', () => {
    let res = service.getCurrentUser();

    expect(res).toEqual(service['currentUser']);

  });

  it('isAuthenticated', () => {
    service['token'] = '12345';

    let res = service.isAuthenticated();

    expect(res).toBeTruthy();

    service['token'] = null;

    res = service.isAuthenticated();

    expect(res).toBeFalse();
  });
});
