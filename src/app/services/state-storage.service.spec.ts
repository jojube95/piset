import { TestBed } from '@angular/core/testing';

import { StateStorageService } from './state-storage.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('StateStorageService', () => {
  let service: StateStorageService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(StateStorageService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
