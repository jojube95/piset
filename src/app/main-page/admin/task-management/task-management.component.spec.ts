import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TaskManagementComponent} from './task-management.component';
import {DebugElement} from '@angular/core';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {GroupStorageService} from '../../../services/group-storage.service';
import {TaskStorageService} from '../../../services/task-storage.service';
import {SubtaskStorageService} from '../../../services/subtask-storage.service';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';
import {Group} from '../../../model/group';
import {FormBuilder} from '@angular/forms';
import {TestService} from '../../../services/test.service';
import {List} from 'immutable';
import {Task} from '../../../model/task';

describe('TaskManagementComponent', () => {
  let component: TaskManagementComponent;
  let fixture: ComponentFixture<TaskManagementComponent>;
  let el: DebugElement;

  let groupStorageService: any;
  let taskStorageService: any;
  let subtaskStorageService: any;
  let testService: any;

  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskManagementComponent ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule, RouterTestingModule],
      providers: [GroupStorageService, TaskStorageService, SubtaskStorageService, FormBuilder, TestService]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(TaskManagementComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      groupStorageService = TestBed.get(GroupStorageService);
      taskStorageService = TestBed.get(TaskStorageService);
      subtaskStorageService = TestBed.get(SubtaskStorageService);
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

    let currentGroup = new Group(null, 'Selecciona grupo', []);
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
    expect(component.updateSubtaskBoolean).toBeFalsy();
    expect(component.updateSubtaskClicked).toBeFalsy();
    expect(component.add).toBeFalsy();
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

  it('display subtasks on select task from list', () => {
    //Spy methods
    let onClickTaskSpy = spyOn(component, 'onClickTask').and.callThrough();
    let getTaskSubtasksSpy = spyOn(subtaskStorageService, 'getTaskSubtasks').and.callThrough();

    expect(onClickTaskSpy).not.toHaveBeenCalled();
    expect(getTaskSubtasksSpy).not.toHaveBeenCalled();

    //Get mock data
    let task = testService.getTaskByName('Task1');
    let subtasks = testService.getSubtasksByTaskId(task._id);

    //Call component.onClickTask
    component.onClickTask(task);

    //Check component variables
    expect(component.updateSubtaskClicked).toBeFalsy();
    expect(component.updateSubtaskBoolean).toBeFalsy();
    expect(component.taskSelected).toBeTruthy();
    expect(component.add).toBeFalsy();
    expect(component.currentTask).toEqual(task);

    expect(onClickTaskSpy).toHaveBeenCalled();
    expect(getTaskSubtasksSpy).toHaveBeenCalled();

    //Mock getSubtasks with mock data
    const reqUsers = httpTestingController.expectOne(taskStorageService.API_URL + '/api/subtasks/getByTask' + task._id);
    reqUsers.flush({
      message: "Success",
      subtasks: subtasks
    });

    fixture.detectChanges();

    //Check list and observable
    let subtasksList = el.query(By.css('#subtasksList'));
    expect(subtaskStorageService._subtasksTask.getValue().size).toBe(2);
    expect(subtasksList.nativeElement.children.length).toBe(3);
  });

  xit('delete task and delete from list', () => {
    //Spy methods
    let onClickDeleteTaskSpy = spyOn(component, 'onClickDeleteTask').and.callThrough();
    let deleteTaskFromGroupSpy = spyOn(taskStorageService, 'deleteTaskFromGroup').and.callThrough();

    //Get mock data
    let group = testService.getGroupByName('Group1');
    let tasks = testService.getTasksByGroupId(group._id);
    let deleteTask = tasks[0];

    //Call component.onClickTask
    component.selectGroup(group);

    fixture.detectChanges();

    expect(onClickDeleteTaskSpy).not.toHaveBeenCalled();
    expect(deleteTaskFromGroupSpy).not.toHaveBeenCalled();

    //Call component.deleteTask
    component.onClickDeleteTask(deleteTask)

    //Check component variables
    expect(component.updateSubtaskBoolean).toBeFalsy();
    expect(component.updateSubtaskClicked).toBeFalsy();
    expect(component.add).toBeFalsy();
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

  xit('delete subtask and delete from list', () => {
    //Spy methods
    let onClickDeleteSubtaskSpy = spyOn(component, 'onClickDeleteSubtask').and.callThrough();
    let deleteSubtaskSpy = spyOn(subtaskStorageService, 'deleteSubtask').and.callThrough();

    //Get mock data
    let task = testService.getTaskByName('Task1');
    let subtasks = testService.getSubtasksByTaskId(task._id);
    let deleteSubtask = subtasks[0]

    //Call component.onClickTask
    component.onClickTask(task);
    fixture.detectChanges();

    expect(onClickDeleteSubtaskSpy).not.toHaveBeenCalled();
    expect(deleteSubtaskSpy).not.toHaveBeenCalled();

    //Call component.deleteSubTask
    component.onClickDeleteSubtask(deleteSubtask);

    expect(onClickDeleteSubtaskSpy).toHaveBeenCalled();
    expect(deleteSubtaskSpy).toHaveBeenCalled();
    //Mock deleteSubtask with mock data
    const reqUsers = httpTestingController.expectOne(subtaskStorageService.API_URL + '/api/subtasks/deleteFromTask');
    reqUsers.flush({
      message: "Success"
    });

    fixture.detectChanges();
    //Check list and observable
    let subtasksList = el.query(By.css('#subtasksList'));
    expect(subtaskStorageService._subtasksTask.getValue()).not.toContain(deleteSubtask);
    console.log(subtasksList.nativeElement);
    expect(subtasksList.nativeElement.children.length).toBe(2);
  });

  it('update task button dont show until task is clicked', () => {
    //Spy method onClickTask
    let onClickTaskSpy = spyOn(component, 'onClickTask').and.callThrough();
    let getTaskSubtasksSpy = spyOn(subtaskStorageService, 'getTaskSubtasks');
    //Get mock data
    let group = testService.getGroupByName('Group1');
    let tasks = testService.getTasksByGroupId(group._id);

    expect(onClickTaskSpy).not.toHaveBeenCalled();

    //Push tasks to tasklist using service observable
    taskStorageService._tasksGroup.next(List(tasks));

    //Check component.variables
    expect(component.updateSubtaskClicked).toBeFalsy();
    expect(component.updateSubtaskBoolean).toBeFalsy();
    expect(component.taskSelected).toBeFalsy();
    expect(component.add).toBeFalsy();
    expect(component.currentTask).toBeFalsy()
    expect(getTaskSubtasksSpy).not.toHaveBeenCalled();
    //Check button doesnt exist
    expect(el.query(By.css('#updateTaskButton'))).toBeFalsy();

    //Click on task
    component.onClickTask(tasks[0]);
    fixture.detectChanges();

    //Check component.variables
    expect(component.updateSubtaskClicked).toBeFalsy();
    expect(component.updateSubtaskBoolean).toBeFalsy();
    expect(component.taskSelected).toBeTruthy();
    expect(component.add).toBeFalsy();
    expect(component.currentTask).toEqual(tasks[0])
    expect(getTaskSubtasksSpy).toHaveBeenCalled();

    //Check button doesnt exist
    expect(el.query(By.css('#updateTaskButton'))).toBeTruthy();
  });

  it('update task should open update task form with clicked task data', () => {
    //Spy method onClickTask
    let onClickTaskSpy = spyOn(component, 'onClickTask').and.callThrough();
    let onClickUpdateTask = spyOn(component, 'onClickUpdateTask').and.callThrough();
    let getTaskSubtasksSpy = spyOn(subtaskStorageService, 'getTaskSubtasks');

    //Get mock data
    let group = testService.getGroupByName('Group1');
    let tasks = testService.getTasksByGroupId(group._id);

    expect(onClickUpdateTask).not.toHaveBeenCalled();

    //Push tasks to tasklist using service observable
    taskStorageService._tasksGroup.next(List(tasks));

    //Click on task
    component.onClickTask(tasks[0]);
    fixture.detectChanges();

    //Check button doesnt exist
    let updateTask = el.query(By.css('#updateTaskButton'))

    expect(component.updateTask).toBeFalsy();
    expect(component.currentEditTask).toBeFalsy();
    expect(el.query(By.css('#updateTaskForm'))).toBeFalsy();
    updateTask.nativeElement.click();

    fixture.detectChanges();

    expect(onClickUpdateTask).toHaveBeenCalled();

    expect(component.updateTask).toBeTruthy();
    expect(component.currentEditTask).toEqual(tasks[0])
    expect(el.query(By.css('#updateTaskForm'))).toBeTruthy();

    //Check update task name
    expect(el.query(By.css('#updateTaskForm')).children[0].children[1].nativeElement.value).toBe(tasks[0].name);
  });

  it('update task form validation and button enabled/disabled', () => {
    //Get mock data
    let group = testService.getGroupByName('Group1');
    let tasks = testService.getTasksByGroupId(group._id);

    //Push tasks to tasklist using service observable
    taskStorageService._tasksGroup.next(List(tasks));

    //Click on task
    component.onClickTask(tasks[0]);
    fixture.detectChanges();

    component.onClickUpdateTask();
    fixture.detectChanges();

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

  it('add task form validation and button enabled/disabled', () => {
    //Get mock data
    let group = testService.getGroupByName('Group1');

    component.onClickAdd();

    fixture.detectChanges();

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

  it('update task update task on list', () => {

  });

  it('click back on add task should hide form', () => {
    //Get mock data
    let group = testService.getGroupByName('Group1');

    component.onClickAdd();

    fixture.detectChanges();

    //Check back button

  });

  it('click back on update task should hide form', () => {
    //Get mock data
    let group = testService.getGroupByName('Group1');
    let tasks = testService.getTasksByGroupId(group._id);

    //Push tasks to tasklist using service observable
    taskStorageService._tasksGroup.next(List(tasks));

    //Click on task
    component.onClickTask(tasks[0]);
    fixture.detectChanges();

    component.onClickUpdateTask();
    fixture.detectChanges();

    //Check back button
  });

  it('add task should add task on list', () => {

  });

  it('add subtask should add subtask on list', () => {

  });

  it('update subtask form validation and update/enable button', () => {

  });

  it('update subtask update task on list', () => {

  });
});
