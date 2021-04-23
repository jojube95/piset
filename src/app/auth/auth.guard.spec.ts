import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from './auth.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  let authService: any;
  let router: Router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [AuthService]
    });
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.get(AuthService);
    router = TestBed.get(Router);
    spyOn(router, 'navigate');
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should not call at start', () => {
    const canActivateSpy = spyOn(guard, 'canActivate');

    expect(canActivateSpy).not.toHaveBeenCalled();
  });

  it('should navigate to login page when user not authenticated', () => {
    const authServiceIsAuthenticatedSpy = spyOn(authService, 'isAuthenticated').and.returnValue(false);

    expect(authServiceIsAuthenticatedSpy).not.toHaveBeenCalled();

    guard.canActivate(null, null);

    expect(authServiceIsAuthenticatedSpy).toHaveBeenCalled();
    expect (router.navigate).toHaveBeenCalledWith(['']);
  });

  it('should return true when user authenticated', () => {
    const authServiceIsAuthenticatedSpy = spyOn(authService, 'isAuthenticated').and.returnValue(true);
    const guardSpy = spyOn(guard, 'canActivate').and.callThrough();

    expect(authServiceIsAuthenticatedSpy).not.toHaveBeenCalled();
    expect(guardSpy).not.toHaveBeenCalled();

    const res = guard.canActivate(null, null);

    expect(authServiceIsAuthenticatedSpy).toHaveBeenCalled();
    expect(guardSpy).toHaveBeenCalled();
    expect(res).toBe(true);
  });
});
