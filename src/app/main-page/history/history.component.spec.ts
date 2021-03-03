import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import {HistoryComponent} from './history.component';
import {DebugElement} from '@angular/core';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormBuilder} from '@angular/forms';
import {TestService} from '../../services/test.service';
import {UserStorageService} from '../../services/user-storage.service';
import {HistoryStorageService} from '../../services/history-storage.service';

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;
  let el: DebugElement;

  let currentDate = new Date();

  let userStorageService: any;
  let historyStorageService: any;
  let testService: any;

  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryComponent ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule, RouterTestingModule],
      providers: [UserStorageService, HistoryStorageService, FormBuilder, TestService]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(HistoryComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      userStorageService = TestBed.get(UserStorageService);
      historyStorageService = TestBed.get(HistoryStorageService);
      httpTestingController = TestBed.get(HttpTestingController);
      testService = TestBed.get(TestService);
      component.loggedUser = testService.getUserByMail('user1@user.com');
      fixture.autoDetectChanges()
      component.ngOnInit();
    });


  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create with initial variables', () => {
    let getCurrentUserSpy = spyOn(userStorageService, 'getCurrentUser');
    let getUserHistoriesSpy = spyOn(historyStorageService, 'getUserHistories');


    expect(getCurrentUserSpy).toHaveBeenCalled();
    expect(component.loggedUser.mail).toBe('user1@user.com');
    expect(component.currentDate).toBe(currentDate);
    expect(component.maxDate).toBe(new Date(currentDate.getFullYear() + 5, 0, 0));
    expect(component.minDate).toBe(new Date(currentDate.getFullYear() - 5, 0, 1));

    expect(getUserHistoriesSpy).toHaveBeenCalled();
  });

  it('should populate list at start', () => {
    //Spy methods
    let getUserHistoriesSpy = spyOn(historyStorageService, 'getUserHistories').and.callThrough();

    //Get mock data
    let histories = testService.getHistoriesByUserId(component.loggedUser._id);

    expect(getUserHistoriesSpy).toHaveBeenCalled();

    //Mock http request
    const reqUsers = httpTestingController.expectOne(historyStorageService.API_URL + '/api/histories/getByUser' + component.loggedUser._id);
    reqUsers.flush({
      message: "Success",
      histories: histories
    });

    fixture.detectChanges();

    //Check list

  })
});
