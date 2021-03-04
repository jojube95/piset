import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import {HistoryComponent} from './history.component';
import {DebugElement} from '@angular/core';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {TestService} from '../../services/test.service';
import {UserStorageService} from '../../services/user-storage.service';
import {HistoryStorageService} from '../../services/history-storage.service';
import { DateFilterPipe } from '../../pipe/date-filter.pipe';

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;
  let el: DebugElement;

  let currentDate = new Date();

  let userStorageService: any;
  let historyStorageService: any;
  let testService: any;

  let getCurrentUserSpy: any;
  let getUserHistoriesSpy: any;

  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryComponent, DateFilterPipe ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule, RouterTestingModule],
      providers: [UserStorageService, HistoryStorageService, ReactiveFormsModule, TestService]
    }).compileComponents().then(() => {
      userStorageService = TestBed.get(UserStorageService);
      historyStorageService = TestBed.get(HistoryStorageService);
      getCurrentUserSpy = spyOn(userStorageService, 'getCurrentUser').and.callFake(() => {
        return testService.getUserByMail('user1@user.com');
      });
      getUserHistoriesSpy = spyOn(historyStorageService, 'getUserHistories').and.callThrough();

      testService = TestBed.get(TestService);


      fixture = TestBed.createComponent(HistoryComponent);
      component = fixture.componentInstance;


      el = fixture.debugElement;

      httpTestingController = TestBed.get(HttpTestingController);


      fixture.autoDetectChanges();
    });


  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create with initial variables', () => {
    expect(getCurrentUserSpy).toHaveBeenCalled();
    expect(component.loggedUser.mail).toBe('user1@user.com');

    expect(component.currentDate.getFullYear()).toEqual(currentDate.getFullYear());
    expect(component.currentDate.getMonth()).toEqual(currentDate.getMonth());
    expect(component.currentDate.getDay()).toEqual(currentDate.getDay());

    expect(component.maxDate).toEqual(new Date(currentDate.getFullYear() + 5, 0, 0));
    expect(component.minDate).toEqual(new Date(currentDate.getFullYear() - 5, 0, 1));
    expect(getUserHistoriesSpy).toHaveBeenCalled();
  });

  xit('should populate list at start', () => {
    let loggedMockUser = component.loggedUser = testService.getUserByMail('user1@user.com');

    //Spy methods
    //getUserHistoriesSpy.and.callThrough();
    //getUserHistoriesSpy.and.callThrough();

    //Get mock data
    let mockHistories = testService.getHistoriesByUserId(component.loggedUser._id);

    expect(getUserHistoriesSpy).toHaveBeenCalled();

    //Mock http request
    const reqUsers = httpTestingController.expectOne(historyStorageService.API_URL + '/api/histories/getByUser' + component.loggedUser._id);
    reqUsers.flush({
      message: "Success",
      histories: mockHistories
    });

    fixture.detectChanges();

    //Check list
    console.log(historyStorageService._userHistory.getValue());
    console.log(mockHistories);
    expect(historyStorageService._userHistory.getValue()).toEqual(mockHistories);
  })
});
