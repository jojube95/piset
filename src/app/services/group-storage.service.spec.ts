import { TestBed } from '@angular/core/testing';

import { GroupStorageService } from './group-storage.service';

xdescribe('GroupStorageService', () => {
  //Notes:
  //beforeEach should use async await(restore database())
  //Test all service methods
  //Get the expected data from testService
  //Check API error handling
  //C: should return success
  //R: should return success and the expeted data
  //U: should return success
  //D: should return success

  let service: GroupStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupStorageService);

    });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
