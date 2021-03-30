import { TestBed } from '@angular/core/testing';

import { AchivementStorageService } from './achivement-storage.service';

describe('AchivementStorageService', () => {
  let service: AchivementStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AchivementStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
