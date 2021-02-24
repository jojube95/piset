import { TestBed } from '@angular/core/testing';

import { HistoryStorageService } from './history-storage.service';

describe('HistoryStorageService', () => {
  let service: HistoryStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
