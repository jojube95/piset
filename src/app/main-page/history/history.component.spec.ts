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
import {TaskFilterPipe} from '../../pipe/task-filter.pipe';
import {HistoryFilterPipe} from '../../pipe/history-filter.pipe';

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;
  let el: DebugElement;

  let userStorageService: any;
  let historyStorageService: any;
  let testService: any;

  let getCurrentUserSpy: any;
  let getUserHistoriesSpy: any;

  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryComponent, TaskFilterPipe, HistoryFilterPipe ],
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
    expect(historyStorageService._userHistory.getValue()).toEqual(mockHistories);
  })
});
