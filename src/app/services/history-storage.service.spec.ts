import {TestBed} from '@angular/core/testing';
import { HistoryStorageService } from './history-storage.service';
import {TestService} from './test.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {History} from '../model/history';

describe('HistoryStorageService', () => {
  let service: HistoryStorageService;

  let testService: TestService;
  let httpTestingController: HttpTestingController;

  let getUserHistoriesSpy: any;
  let getGroupHistoriesSpy: any;
  let createHistorySpy: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [TestService]
    });
    service = TestBed.inject(HistoryStorageService);
    testService = TestBed.inject(TestService);
    httpTestingController = TestBed.get(HttpTestingController);

    getUserHistoriesSpy = spyOn(service, 'getUserHistories').and.callThrough();
    getGroupHistoriesSpy = spyOn(service, 'getGroupHistories').and.callThrough();
    createHistorySpy = spyOn(service, 'createHistory').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();

    expect(getUserHistoriesSpy).not.toHaveBeenCalled();
    expect(getGroupHistoriesSpy).not.toHaveBeenCalled();
    expect(createHistorySpy).not.toHaveBeenCalled();
  });

  it('getUserHistories', () => {
    //Get mock data
    let mockUser = testService.getUserByMail('user1@user.com');
    let mockHistories = testService.getHistoriesByUserId(mockUser._id);

    //Call service method
    service.getUserHistories(mockUser);

    //Create the mockCall
    const reqHistories = httpTestingController.expectOne(service['API_URL'] + '/api/histories/getByUser' + mockUser._id);

    reqHistories.flush({
      histories: mockHistories
    });

    //Expect request method
    expect(reqHistories.request.method).toEqual('GET');
    //Expect request parameters
    expect(reqHistories.request.params.keys().length).toBe(0);
    //Expect the returned data
    expect(service._userHistory.getValue().size).toEqual(1);
    expect(service._userHistory.getValue().get(0).taskName).toEqual('Task1');
  });

  it('getGroupHistories', () => {
    //Get mock data
    let mockGroup = testService.getGroupByName('Group1');
    let mockHistories = testService.getHistoriesByGroupId(mockGroup._id);

    //Call service method
    service.getGroupHistories(mockGroup);

    //Create the mockCall
    const reqHistories = httpTestingController.expectOne(service['API_URL'] + '/api/histories/getByGroup' + mockGroup._id);

    reqHistories.flush({
      histories: mockHistories
    });

    //Expect request method
    expect(reqHistories.request.method).toEqual('GET');
    //Expect request parameters
    expect(reqHistories.request.params.keys().length).toBe(0);
    //Expect the returned data
    expect(service._histories.getValue().size).toEqual(4);
    expect(service._histories.getValue().get(0).taskName).toEqual('Task1');
    expect(service._histories.getValue().get(1).taskName).toEqual('Task2');
    expect(service._histories.getValue().get(2).taskName).toEqual('Task3');
    expect(service._histories.getValue().get(3).taskName).toEqual('Task4');
  });

  it('createHistory', () => {
    let mockHistory = testService.getHistoriesByUserId(testService.getUserByMail('user1@user.com')._id)[0];

    //Call service method
    service.createHistory(mockHistory as unknown as History);

    //Create the mockCall
    const reqHistory = httpTestingController.expectOne(service['API_URL'] + '/api/histories/addPenalty');

    reqHistory.flush({
      message: 'Succes'
    });

    //Expect request method
    expect(reqHistory.request.method).toEqual('POST');
    //Expect request body
    expect(reqHistory.request.body.history).toEqual(mockHistory);
    //Expect request parameters
    expect(reqHistory.request.params.keys().length).toBe(0);
    //Expect the returned data
    expect(service._histories.getValue().size).toEqual(1);
    expect(service._histories.getValue().get(0).taskName).toEqual('Task1');
  });

  afterEach(() => {
    httpTestingController.verify();
  })

});
