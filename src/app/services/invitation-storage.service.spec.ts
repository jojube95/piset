import { TestBed } from '@angular/core/testing';

import { InvitationStorageService } from './invitation-storage.service';

xdescribe('InvitationStorageService', () => {
  let service: InvitationStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvitationStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
