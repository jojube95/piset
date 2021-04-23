import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TaskAddComponent } from './task-add.component';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {TaskStorageService} from '../../../services/task-storage.service';
import {TestService} from '../../../services/test.service';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';

describe('TaskAddComponent', () => {
  let component: TaskAddComponent;
  let fixture: ComponentFixture<TaskAddComponent>;

  let el: DebugElement;

  let taskStorageService: any;
  let testService: any;


  const mockDialogRef = {
    close: jasmine.createSpy('close'),
    open: jasmine.createSpy('open')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskAddComponent ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule, MatDialogModule],
      providers: [TaskStorageService, TestService, {
        provide: MatDialogRef,
        useValue: mockDialogRef
      }]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(TaskAddComponent);
      testService = TestBed.get(TestService);
      taskStorageService = TestBed.get(TaskStorageService);

      component = fixture.componentInstance;
      component.group = testService.getGroupByName('Group1');

      el = fixture.debugElement;
      fixture.detectChanges();
    });


  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form validation and button enabled/disabled', () => {
    let mockTask = testService.getTaskByUserId(testService.getUserByMail('user1@user.com')._id);

    //Check form validation
    let name = component.formAddTask.controls['name'];
    let description = component.formAddTask.controls['description'];
    let dateIni = component.formAddTask.controls['dateIni'];
    let dateEnd = component.formAddTask.controls['dateEnd'];
    let estimatedTime = component.formAddTask.controls['estimatedTime'];
    let state = component.formAddTask.controls['state'];

    name.setValue('');
    fixture.detectChanges();

    expect(name.hasError('required')).toBe(true);

    expect(el.query(By.css('#addButton')).nativeElement.disabled).toBeTruthy();

    name.setValue(mockTask.name);
    fixture.detectChanges();

    expect(name.hasError('required')).toBe(false);
    expect(el.query(By.css('#addButton')).nativeElement.disabled).toBeTruthy();


    description.setValue('');
    fixture.detectChanges();

    expect(description.hasError('required')).toBe(true);
    expect(el.query(By.css('#addButton')).nativeElement.disabled).toBeTruthy();

    description.setValue(mockTask.description);
    fixture.detectChanges();

    expect(description.hasError('required')).toBe(false);
    expect(el.query(By.css('#addButton')).nativeElement.disabled).toBeTruthy();



    dateIni.setValue('');
    fixture.detectChanges();

    expect(dateIni.hasError('required')).toBe(true);
    expect(el.query(By.css('#addButton')).nativeElement.disabled).toBeTruthy();

    dateIni.setValue(mockTask.dateIni);
    fixture.detectChanges();

    expect(dateIni.hasError('required')).toBe(false);
    expect(el.query(By.css('#addButton')).nativeElement.disabled).toBeTruthy();


    dateEnd.setValue('');
    fixture.detectChanges();

    expect(dateEnd.hasError('required')).toBe(true);
    expect(el.query(By.css('#addButton')).nativeElement.disabled).toBeTruthy();

    dateEnd.setValue(mockTask.dateEnd);
    fixture.detectChanges();

    expect(dateEnd.hasError('required')).toBe(false);
    expect(el.query(By.css('#addButton')).nativeElement.disabled).toBeTruthy();


    estimatedTime.setValue('');
    fixture.detectChanges();

    expect(estimatedTime.hasError('required')).toBe(true);
    expect(el.query(By.css('#addButton')).nativeElement.disabled).toBeTruthy();

    estimatedTime.setValue(mockTask.estimatedTime);
    fixture.detectChanges();

    expect(estimatedTime.hasError('required')).toBe(false);
    expect(el.query(By.css('#addButton')).nativeElement.disabled).toBeTruthy();


    state.setValue('');
    fixture.detectChanges();

    expect(state.hasError('required')).toBe(true);
    expect(el.query(By.css('#addButton')).nativeElement.disabled).toBeTruthy();

    state.setValue(mockTask.state.name);
    fixture.detectChanges();

    expect(state.hasError('required')).toBe(false);
    expect(el.query(By.css('#addButton')).nativeElement.disabled).toBeFalsy();
  });




  it('add task should add task on list', () => {
    let onAddSpy = spyOn(component, 'onAdd').and.callThrough();
    let addTaskToGroupSpy = spyOn(taskStorageService, 'addTaskToGroup');

    //Set form data
    let mockTask = testService.getTaskByUserId(testService.getUserByMail('user1@user.com')._id);

    component.formAddTask.controls['name'].setValue(mockTask.name);
    component.formAddTask.controls['description'].setValue(mockTask.description);
    component.formAddTask.controls['dateIni'].setValue(mockTask.dateIni);
    component.formAddTask.controls['dateEnd'].setValue(mockTask.dateEnd);
    component.formAddTask.controls['estimatedTime'].setValue(mockTask.estimatedTime);
    component.formAddTask.controls['state'].setValue(mockTask.state.name);

    expect(onAddSpy).not.toHaveBeenCalled();
    expect(addTaskToGroupSpy).not.toHaveBeenCalled();

    component.onAdd();

    expect(onAddSpy).toHaveBeenCalled();
    expect(addTaskToGroupSpy).toHaveBeenCalled();
  });
});
