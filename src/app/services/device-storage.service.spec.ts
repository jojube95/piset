import { TestBed } from '@angular/core/testing';

import { DeviceStorageService } from './device-storage.service';

describe('DeviceStorageService', () => {
  let service: DeviceStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
