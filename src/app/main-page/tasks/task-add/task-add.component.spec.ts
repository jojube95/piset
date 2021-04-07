import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TaskAddComponent } from './task-add.component';
import {By} from '@angular/platform-browser';
import {List} from 'immutable';
import {DebugElement} from '@angular/core';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {GroupStorageService} from '../../../services/group-storage.service';
import {TaskStorageService} from '../../../services/task-storage.service';
import {TestService} from '../../../services/test.service';
import {TaskManagementComponent} from '../../admin/task-management/task-management.component';

describe('TaskAddComponent', () => {
  let component: TaskAddComponent;
  let fixture: ComponentFixture<TaskAddComponent>;

  let el: DebugElement;

  let taskStorageService: any;
  let testService: any;

  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskAddComponent ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      providers: [TaskStorageService, TestService]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(TaskAddComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      taskStorageService = TestBed.get(TaskStorageService);
      httpTestingController = TestBed.get(HttpTestingController);
      testService = TestBed.get(TestService);
      fixture.autoDetectChanges()
      component.ngOnInit();
    });


  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('add task form validation and button enabled/disabled', () => {
    //Get mock data
    let group = testService.getGroupByName('Group1');


    //Check form validation
    let submitAddTask = el.query(By.css('#submitAddTask'));
    let taskName = component.formAddTask.controls['taskName'];

    taskName.setValue('');
    fixture.detectChanges();
    expect(taskName.hasError('required')).toBe(true);
    expect(submitAddTask.nativeElement.disabled).toBeTruthy();

    taskName.setValue('Test');
    fixture.detectChanges();

    expect(taskName.hasError('required')).toBe(false);
    expect(submitAddTask.nativeElement.disabled).toBeFalsy();
  });




  it('add task should add task on list', () => {
    //Spy methods
    let addTaskSubtasksSpy = spyOn(taskStorageService, 'addTaskToGroup').and.callThrough();

    //Get group mock data
    let group = testService.getGroupByName('Group1');

    //Get tasks mock data
    let tasks = testService.getTasksByGroupId(group._id);

    //Set taskName mock data
    let mockTaskName = 'TestTask';

    //Push the tasks to the _taskGroup on the service
    taskStorageService._tasksGroup.next(List(tasks));

    //Click add task
    fixture.detectChanges();

    //Set form addTask
    let submitAddTask = el.query(By.css('#submitAddTask'));
    let taskName = component.formAddTask.controls['taskName'];

    taskName.setValue(mockTaskName);
    fixture.detectChanges();

    //Call addTask service
    expect(addTaskSubtasksSpy).not.toHaveBeenCalled();

    expect(addTaskSubtasksSpy).toHaveBeenCalled();

    //Mock the http call with the taskAdd mock data
    const reqUsers = httpTestingController.expectOne(taskStorageService.API_URL + '/api/tasks/addToGroup');
    reqUsers.flush({
      message: "Success"
    });

    fixture.detectChanges();

    //Check the data is added to the observable and list
    expect(taskStorageService._tasksGroup.getValue().size).toBe(5)
    let tasksList = el.query(By.css('#tasksList'));
    expect(tasksList.nativeElement.children.length).toBe(5);
  });
});
