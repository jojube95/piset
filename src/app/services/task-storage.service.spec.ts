import { TestBed } from '@angular/core/testing';

import { TaskStorageService } from './task-storage.service';

xdescribe('TaskStorageService', () => {
  let service: TaskStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
