import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { Router} from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerSpy}
      ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should navigate to login page', () => {
    expect (routerSpy.navigate).toHaveBeenCalledWith(['']);
  });
});
