import { TestBed } from '@angular/core/testing';

import { TestService } from './test.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('TestService', () => {
  let service: TestService;

  let httpTestingController: HttpTestingController;

  let getCurrentDateSpy: any;
  let nextWeekSpy: any;
  let restoreDatabaseSpy: any;
  let exportDatabaseSpy: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TestService);
    httpTestingController = TestBed.get(HttpTestingController);
    getCurrentDateSpy = spyOn(service, 'getCurrentDate').and.callThrough();
    nextWeekSpy = spyOn(service, 'nextWeek').and.callThrough();
    restoreDatabaseSpy = spyOn(service, 'restoreDatabase').and.callThrough();
    exportDatabaseSpy = spyOn(service, 'exportDatabase').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();

    expect(getCurrentDateSpy).not.toHaveBeenCalled();
    expect(nextWeekSpy).not.toHaveBeenCalled();
    expect(restoreDatabaseSpy).not.toHaveBeenCalled();
    expect(exportDatabaseSpy).not.toHaveBeenCalled();
  });

  it('getCurrentDate', () => {
    //Get mock data
    let mockDate = new Date('2020-11-30T16:35:19Z');

    //Call service method
    service.getCurrentDate();

    //Create the mockCall
    const reqTest = httpTestingController.expectOne(service['API_URL'] + '/api/test/getCurrentDate');

    reqTest.flush({
      currentDate: mockDate
    });

    //Expect request method
    expect(reqTest.request.method).toEqual('GET');
    //Expect request parameters
    expect(reqTest.request.params.keys().length).toBe(0);
    //Expect the returned data
    expect(service._currentDate.getValue()).toEqual(mockDate);
  });

  it('nextWeek', () => {
    //Get mock data
    let mockDate = new Date('2020-11-30T16:35:19Z');

    //Call service method
    service.nextWeek();

    //Create the mockCall
    const reqTest = httpTestingController.expectOne(service['API_URL'] + '/api/test/nextWeek');

    reqTest.flush({
      currentDate: mockDate
    });

    //Expect request method
    expect(reqTest.request.method).toEqual('GET');
    //Expect request parameters
    expect(reqTest.request.params.keys().length).toBe(0);
    //Expect the returned data
    expect(service._currentDate.getValue()).toEqual(mockDate);
  });

  it('restoreDatabase', () => {
    let mockDatabase = 'test';

    //Call service method
    service.restoreDatabase(mockDatabase);

    //Create the mockCall
    const reqTest = httpTestingController.expectOne(service['API_URL'] + '/api/test/restoreDatabase' + mockDatabase);

    reqTest.flush({
      message: 'Success'
    });

    //Expect request method
    expect(reqTest.request.method).toEqual('GET');
    //Expect request parameters
    expect(reqTest.request.params.keys().length).toBe(0);
  });

  it('exportDatabase', () => {
    let mockDatabase = 'test';

    //Call service method
    service.exportDatabase(mockDatabase);

    //Create the mockCall
    const reqTest = httpTestingController.expectOne(service['API_URL'] + '/api/test/exportDatabase' + mockDatabase);

    reqTest.flush({
      message: 'Success'
    });

    //Expect request method
    expect(reqTest.request.method).toEqual('GET');
    //Expect request parameters
    expect(reqTest.request.params.keys().length).toBe(0);
  });

  afterEach(() => {
    httpTestingController.verify();
  })

});
