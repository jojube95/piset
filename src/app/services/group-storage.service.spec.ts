import { TestBed } from '@angular/core/testing';

import { GroupStorageService } from './group-storage.service';

describe('GroupStorageService', () => {
  let service: GroupStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
