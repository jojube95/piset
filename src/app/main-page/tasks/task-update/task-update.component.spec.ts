import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TaskUpdateComponent } from './task-update.component';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {TaskStorageService} from '../../../services/task-storage.service';
import {TestService} from '../../../services/test.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {Task} from '../../../model/task';
import {State} from '../../../model/state';

describe('TaskUpdateComponent', () => {
  let component: TaskUpdateComponent;
  let fixture: ComponentFixture<TaskUpdateComponent>;
  let el: DebugElement;

  let taskStorageService: any;
  let testService: any;

  const mockDialogRef = {
    close: jasmine.createSpy('close'),
    open: jasmine.createSpy('open')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskUpdateComponent],
      imports: [IonicModule.forRoot(), HttpClientTestingModule, ReactiveFormsModule, MatDialogModule],
      providers: [TaskStorageService, TestService, {
        provide: MatDialogRef,
        useValue: mockDialogRef
      },
        {
        provide: MAT_DIALOG_DATA,
        useValue: new Task('Task1', 'Task1Des', 'g1', 'Group1', 'u1', 'User1',
            new Date(Date.UTC(2020, 0, 1)), new Date(Date.UTC(2020, 2, 1)), 12,
            new State('State1', 's1'), 't1')
      }]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(TaskUpdateComponent);
      testService = TestBed.get(TestService);
      taskStorageService = TestBed.get(TaskStorageService);

      component = fixture.componentInstance;
      el = fixture.debugElement;
      fixture.detectChanges();
    });


  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test form init data', () => {
    let name = component.formUpdateTask.controls['name'];
    let description = component.formUpdateTask.controls['description'];
    let dateIni = component.formUpdateTask.controls['dateIni'];
    let dateEnd = component.formUpdateTask.controls['dateEnd'];
    let estimatedTime = component.formUpdateTask.controls['estimatedTime'];
    let state = component.formUpdateTask.controls['state'];

    expect(name.value).toEqual(component.task.name);
    expect(description.value).toEqual(component.task.description);
    expect(dateIni.value).toEqual(component.task.dateIni);
    expect(dateEnd.value).toEqual(component.task.dateEnd);
    expect(estimatedTime.value).toEqual(component.task.estimatedTime);
    expect(state.value).toEqual(component.task.state.name);

  });

  it('task form validations and button enabled/disabled', () => {
    //Check form validation
    let name = component.formUpdateTask.controls['name'];
    let description = component.formUpdateTask.controls['description'];
    let dateIni = component.formUpdateTask.controls['dateIni'];
    let dateEnd = component.formUpdateTask.controls['dateEnd'];
    let estimatedTime = component.formUpdateTask.controls['estimatedTime'];
    let state = component.formUpdateTask.controls['state'];

    name.setValue('');
    fixture.detectChanges();

    expect(name.hasError('required')).toBe(true);
    expect(el.query(By.css('#updateButton')).nativeElement.disabled).toBeTruthy();

    name.setValue(component.task.name);
    fixture.detectChanges();

    expect(name.hasError('required')).toBe(false);
    expect(el.query(By.css('#updateButton')).nativeElement.disabled).toBeFalsy();


    description.setValue('');
    fixture.detectChanges();

    expect(description.hasError('required')).toBe(true);
    expect(el.query(By.css('#updateButton')).nativeElement.disabled).toBeTruthy();

    description.setValue(component.task.description);
    fixture.detectChanges();

    expect(description.hasError('required')).toBe(false);
    expect(el.query(By.css('#updateButton')).nativeElement.disabled).toBeFalsy();



    dateIni.setValue('');
    fixture.detectChanges();

    expect(dateIni.hasError('required')).toBe(true);
    expect(el.query(By.css('#updateButton')).nativeElement.disabled).toBeTruthy();

    dateIni.setValue(component.task.dateIni);
    fixture.detectChanges();

    expect(dateIni.hasError('required')).toBe(false);
    expect(el.query(By.css('#updateButton')).nativeElement.disabled).toBeFalsy();


    dateEnd.setValue('');
    fixture.detectChanges();

    expect(dateEnd.hasError('required')).toBe(true);
    expect(el.query(By.css('#updateButton')).nativeElement.disabled).toBeTruthy();

    dateEnd.setValue(component.task.dateEnd);
    fixture.detectChanges();

    expect(dateEnd.hasError('required')).toBe(false);
    expect(el.query(By.css('#updateButton')).nativeElement.disabled).toBeFalsy();


    estimatedTime.setValue('');
    fixture.detectChanges();

    expect(estimatedTime.hasError('required')).toBe(true);
    expect(el.query(By.css('#updateButton')).nativeElement.disabled).toBeTruthy();

    estimatedTime.setValue(component.task.estimatedTime);
    fixture.detectChanges();

    expect(estimatedTime.hasError('required')).toBe(false);
    expect(el.query(By.css('#updateButton')).nativeElement.disabled).toBeFalsy();


    state.setValue('');
    fixture.detectChanges();

    expect(state.hasError('required')).toBe(true);
    expect(el.query(By.css('#updateButton')).nativeElement.disabled).toBeTruthy();

    state.setValue(component.task.state.name);
    fixture.detectChanges();

    expect(state.hasError('required')).toBe(false);
    expect(el.query(By.css('#updateButton')).nativeElement.disabled).toBeFalsy();
  });

  it('click update task should call service funtion', () => {
    let onUpdateSpy = spyOn(component, 'onUpdate').and.callThrough();
    let updateTaskSpy = spyOn(taskStorageService, 'updateTask');


    expect(onUpdateSpy).not.toHaveBeenCalled();
    expect(updateTaskSpy).not.toHaveBeenCalled();

    component.onUpdate();

    expect(onUpdateSpy).toHaveBeenCalled();
    expect(updateTaskSpy).toHaveBeenCalledWith(component.task);
  });
});
