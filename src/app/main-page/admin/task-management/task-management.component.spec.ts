import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TaskManagementComponent} from './task-management.component';
import {DebugElement} from '@angular/core';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {GroupStorageService} from '../../../services/group-storage.service';
import {TaskStorageService} from '../../../services/task-storage.service';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';
import {Group} from '../../../model/group';
import {ReactiveFormsModule} from '@angular/forms';
import {TestService} from '../../../services/test.service';

describe('TaskManagementComponent', () => {
  let component: TaskManagementComponent;
  let fixture: ComponentFixture<TaskManagementComponent>;
  let el: DebugElement;

  let groupStorageService: any;
  let taskStorageService: any;
  let testService: any;

  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskManagementComponent ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      providers: [GroupStorageService, TaskStorageService, TestService]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(TaskManagementComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      groupStorageService = TestBed.get(GroupStorageService);
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

  it('at start no group is selected', () => {
    let groupSelect =  el.query(By.css('#selectGroup'));

    let currentGroup = new Group(null, 'Selecciona grupo');
    expect(component.currentGroup).toEqual(currentGroup);

    expect(groupSelect.nativeElement.value).toBe('unselect');
  });

  it('display tasks on select group from list', () => {
    //Spy methods
    let onGroupSelectSpy = spyOn(component, 'onGroupSelect').and.callThrough();
    let getGroupTasksSpy = spyOn(taskStorageService, 'getGroupTasks').and.callThrough();

    //Get mock data
    let group = testService.getGroupByName('Group1');
    let tasks = testService.getTasksByGroupId(group._id);

    expect(onGroupSelectSpy).not.toHaveBeenCalled();
    expect(getGroupTasksSpy).not.toHaveBeenCalled();
    //Call component.selectGroup
    let event = {
      detail : {
        value: group
      }
    }
    component.onGroupSelect(event);
    //Check component variables
    expect(component.addTask).toBeFalsy();
    expect(component.taskSelected).toBeFalsy();
    expect(component.groupSelected).toBeTruthy();
    expect(component.currentGroup).toEqual(group);


    expect(onGroupSelectSpy).toHaveBeenCalledWith(event)
    expect(getGroupTasksSpy).toHaveBeenCalledWith(group);
    //Mock getGroupTaks http call service with tasks
    //Mock the http request
    const reqUsers = httpTestingController.expectOne(taskStorageService.API_URL + '/api/tasks/getByGroup' + group._id);
    reqUsers.flush({
      message: "Success",
      tasks: tasks
    });

    fixture.detectChanges();

    //Check list and observable
    let tasksList = el.query(By.css('#tasksList'));
    expect(taskStorageService._tasksGroup.getValue().size).toBe(4);
    expect(tasksList.nativeElement.children.length).toBe(4);
  });

  it('delete task and delete from list', () => {
    //Spy methods
    let onClickDeleteTaskSpy = spyOn(component, 'onClickDeleteTask').and.callThrough();
    let deleteTaskFromGroupSpy = spyOn(taskStorageService, 'deleteTaskFromGroup').and.callThrough();

    //Get mock data
    let group = testService.getGroupByName('Group1');
    let tasks = testService.getTasksByGroupId(group._id);
    let deleteTask = tasks[0];

    //Call component.selectGroup
    let event = {
      detail : {
        value: group
      }
    }
    component.onGroupSelect(event);
    //Mock getGroupTaks http call service with tasks
    //Mock the http request
    const reqTasks = httpTestingController.expectOne(taskStorageService.API_URL + '/api/tasks/getByGroup' + group._id);
    reqTasks.flush({
      message: "Success",
      tasks: tasks
    });

    fixture.detectChanges();

    expect(onClickDeleteTaskSpy).not.toHaveBeenCalled();
    expect(deleteTaskFromGroupSpy).not.toHaveBeenCalled();

    //Call component.deleteTask
    component.onClickDeleteTask(deleteTask)

    //Check component variables
    expect(component.addTask).toBeFalsy();
    expect(component.taskSelected).toBeFalsy();
    expect(component.groupSelected).toBeTruthy();

    expect(onClickDeleteTaskSpy).toHaveBeenCalled();
    expect(deleteTaskFromGroupSpy).toHaveBeenCalled();

    fixture.detectChanges();

    //Mock deleteSubtask with mock data
    const reqUsers = httpTestingController.expectOne(taskStorageService.API_URL + '/api/tasks/deleteFromGroup');
    reqUsers.flush({
      message: "Success",
      tasks: tasks
    });

    fixture.detectChanges();

    //Check list and observable
    let tasksList = el.query(By.css('#tasksList'));

    expect(taskStorageService._tasksGroup.getValue()).not.toContain(deleteTask);
    expect(tasksList.nativeElement.children.length).toBe(3);

  });

  it('select group should enable add task button', () => {
    //Get mock data
    let group = testService.getGroupByName('Group1');

    expect(el.query(By.css('#addTask'))).toBeNull();

    //Call component.selectGroup
    let event = {
      detail : {
        value: group
      }
    }
    component.onGroupSelect(event);
    //Check component variables
    expect(component.addTask).toBeFalsy();
    expect(component.taskSelected).toBeFalsy();
    expect(component.groupSelected).toBeTruthy();
    expect(component.currentGroup).toEqual(group);

    fixture.detectChanges();

    expect(el.query(By.css('#addTask'))).toBeTruthy();
  });

  it('click on add task should open add task component', () => {
    //Get mock data
    let group = testService.getGroupByName('Group1');

    //Call component.selectGroup
    let event = {
      detail : {
        value: group
      }
    }
    component.onGroupSelect(event);

    fixture.detectChanges();

    expect(component.addTask).toBeFalsy();

    let addButton = el.query(By.css('#addTask'));

    addButton.nativeElement.click();

    fixture.detectChanges();

    expect(component.addTask).toBeTruthy();

    expect(el.query(By.css('#addTaskComponent'))).toBeTruthy();
  });

  it('click on task should open update task component', () => {
    //Get mock data
    let group = testService.getGroupByName('Group1');
    let tasks = testService.getTasksByGroupId(group._id);
    let updateTask = tasks[0];

    //Call component.selectGroup
    let event = {
      detail : {
        value: group
      }
    }
    component.onGroupSelect(event);
    //Mock getGroupTaks http call service with tasks
    //Mock the http request
    const reqTasks = httpTestingController.expectOne(taskStorageService.API_URL + '/api/tasks/getByGroup' + group._id);
    reqTasks.flush({
      message: "Success",
      tasks: tasks
    });

    fixture.detectChanges();

    expect(el.query(By.css('#updateTaskComponent'))).toBeFalsy();
    expect(component.taskSelected).toBeFalsy();

    component.onClickTask(updateTask);

    fixture.detectChanges();

    expect(component.taskSelected).toBeTruthy();
    expect(component.currentTask).toEqual(updateTask);

    expect(el.query(By.css('#updateTaskComponent'))).toBeTruthy();
  });
});
