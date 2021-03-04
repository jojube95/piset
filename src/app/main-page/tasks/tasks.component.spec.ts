import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TasksComponent} from './tasks.component';
import {DebugElement} from '@angular/core';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {UserStorageService} from '../../services/user-storage.service';
import {TestService} from '../../services/test.service';
import {SubtaskStorageService} from '../../services/subtask-storage.service';
import {TaskStorageService} from '../../services/task-storage.service';

xdescribe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let el: DebugElement;

  let userStorageService: any;
  let taskStorageService: any;
  let subtaskStorageService: any;
  let testService: any;

  let httpTestingController: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksComponent ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule, RouterTestingModule],
      providers: [UserStorageService, TaskStorageService, SubtaskStorageService, TestService]
    }).compileComponents().then(() => {
      userStorageService = TestBed.get(UserStorageService);
      taskStorageService = TestBed.get(TaskStorageService);
      subtaskStorageService = TestBed.get(SubtaskStorageService);
      el = fixture.debugElement;
      httpTestingController = TestBed.get(HttpTestingController);

      fixture = TestBed.createComponent(TasksComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      fixture.autoDetectChanges();
    });


  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('show user dont have group message if user dont have group', () => {

  });

  it('show user current group', () => {

  });

  it('show user list of current user group', () => {

  });

  it('show selected user task', () => {

  });

  it('show selected user subtasks', () => {

  });

  it('current user can check and uncheck subtask done', () => {

  });

  it('current user admin group can check and uncheck other subtask user', () => {

  });

  it('current user no-admin group cant check and uncheck other subtask user', () => {

  });


});
