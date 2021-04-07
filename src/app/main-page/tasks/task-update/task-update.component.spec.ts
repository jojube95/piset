import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TaskUpdateComponent } from './task-update.component';
import {List} from 'immutable';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {GroupStorageService} from '../../../services/group-storage.service';
import {TaskStorageService} from '../../../services/task-storage.service';
import {TestService} from '../../../services/test.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('TaskUpdateComponent', () => {
  let component: TaskUpdateComponent;
  let fixture: ComponentFixture<TaskUpdateComponent>;
  let el: DebugElement;

  let taskStorageService: any;
  let testService: any;

  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskUpdateComponent, HttpClientTestingModule ],
      providers: [TaskStorageService, TestService],
      imports: [IonicModule.forRoot()]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(TaskUpdateComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      taskStorageService = TestBed.get(TaskStorageService);
      httpTestingController = TestBed.get(HttpTestingController);
      testService = TestBed.get(TestService);
      fixture.detectChanges();
    });


  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('update task form validation and button enabled/disabled', () => {
    //Get mock data
    let group = testService.getGroupByName('Group1');
    let task = testService.getTasksByGroupId(group._id)[0];

    //Check form validation
    let submitUpdateTask = el.query(By.css('#submitUpdateTask'));
    let taskName = component.formUpdateTask.controls['taskName'];

    taskName.setValue('');
    fixture.detectChanges();
    expect(taskName.hasError('required')).toBe(true);
    expect(submitUpdateTask.nativeElement.disabled).toBeTruthy();

    taskName.setValue('Test');
    fixture.detectChanges();

    expect(taskName.hasError('required')).toBe(false);
    expect(submitUpdateTask.nativeElement.disabled).toBeFalsy();
  });

  it('click update task', () => {

  });
});
