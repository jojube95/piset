import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {IonicModule} from '@ionic/angular';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {TestService} from '../services/test.service';
import {Router} from '@angular/router';
import {User} from '../model/user';

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
    service = TestBed.inject(AuthService);
    testService = TestBed.inject(TestService);
    httpTestingController = TestBed.get(HttpTestingController);
    router = TestBed.get(Router);
    spyOn(router, 'navigate');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('signOut', () => {
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

  it('autoAuthUser', () => {

  });

  it('getAuthData', () => {

  });

  it('saveAuthData', () => {

  });

  it('getCurrentUser', () => {

  });

  it('isAuthenticated', () => {

  });
});
