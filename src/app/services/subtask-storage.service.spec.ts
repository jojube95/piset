import { TestBed } from '@angular/core/testing';

import { SubtaskStorageService } from './subtask-storage.service';

xdescribe('SubtaskStorageService', () => {
  let service: SubtaskStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubtaskStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
