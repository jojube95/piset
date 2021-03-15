import { TestBed } from '@angular/core/testing';

import { TaskStorageService } from './task-storage.service';
import {TestService} from './test.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Task} from '../model/task';

describe('TaskStorageService', () => {
  let service: TaskStorageService;

  let testService: TestService;
  let httpTestingController: HttpTestingController;

  let getGroupTasksSpy: any;
  let addTaskToGroupSpy: any;
  let deleteTaskFromGroupSpy: any;
  let updateTaskSpy: any;
  let getTaskByUserSpy: any;
  let reasignTasksSpy: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [TestService]
    });
    service = TestBed.inject(TaskStorageService);
    testService = TestBed.inject(TestService);
    httpTestingController = TestBed.get(HttpTestingController);

    getGroupTasksSpy = spyOn(service, 'getGroupTasks').and.callThrough();
    addTaskToGroupSpy = spyOn(service, 'addTaskToGroup').and.callThrough();
    deleteTaskFromGroupSpy = spyOn(service, 'deleteTaskFromGroup').and.callThrough();
    updateTaskSpy = spyOn(service, 'updateTask').and.callThrough();
    getTaskByUserSpy = spyOn(service, 'getTaskByUser').and.callThrough();
    reasignTasksSpy = spyOn(service, 'reasignTasks').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();

    expect(getGroupTasksSpy).not.toHaveBeenCalled();
    expect(addTaskToGroupSpy).not.toHaveBeenCalled();
    expect(deleteTaskFromGroupSpy).not.toHaveBeenCalled();
    expect(updateTaskSpy).not.toHaveBeenCalled();
    expect(getTaskByUserSpy).not.toHaveBeenCalled();
    expect(reasignTasksSpy).not.toHaveBeenCalled();
  });

  it('getGroupTasks', () => {
    //Get mock data
    let mockGroup = testService.getGroupByName('Group1');
    let mockTasks = testService.getTasksByGroupId(mockGroup._id);

    //Call service method
    service.getGroupTasks(mockGroup);

    //Create the mockCall
    const reqTasks = httpTestingController.expectOne(service['API_URL'] + '/api/tasks/getByGroup' + mockGroup._id);

    reqTasks.flush({
      tasks: mockTasks
    });

    //Expect request method
    expect(reqTasks.request.method).toEqual('GET');
    //Expect request parameters
    expect(reqTasks.request.params.keys().length).toBe(0);
    //Expect the returned data
    expect(service._tasksGroup.getValue().size).toEqual(4);
    expect(service._tasksGroup.getValue().get(0).name).toEqual('Task1');
    expect(service._tasksGroup.getValue().get(1).name).toEqual('Task2');
    expect(service._tasksGroup.getValue().get(2).name).toEqual('Task3');
    expect(service._tasksGroup.getValue().get(3).name).toEqual('Task4');
  });

  it('addTaskToGroup', () => {
    //Get mock data
    let mockGroup = testService.getGroupByName('Group1');
    let mockTask = new Task('Task5', null);

    //Call service method
    service.addTaskToGroup(mockGroup, mockTask);

    //Create the mockCall
    const reqTasks = httpTestingController.expectOne(service['API_URL'] + '/api/tasks/addToGroup');

    reqTasks.flush({
      message: 'Succes'
    });

    //Expect request method
    expect(reqTasks.request.method).toEqual('POST');
    //Expect request body
    expect(reqTasks.request.body.task).toEqual(mockTask);
    expect(reqTasks.request.body.groupId).toEqual(mockGroup._id);
    //Expect request parameters
    expect(reqTasks.request.params.keys().length).toBe(0);
    //Expect the returned data
    expect(service._tasksGroup.getValue().size).toEqual(1);
    expect(service._tasksGroup.getValue().get(0).name).toEqual('Task5');
  });

  it('deleteTaskFromGroup', () => {
    //Get mock data
    let mockGroup = testService.getGroupByName('Group1');
    let mockTasks = testService.getTasksByGroupId(mockGroup._id)
    let mockTaskDeleted = mockTasks[0];

    //Populate initial list with mock data
    service._tasksGroup.next(service._tasksGroup.getValue().push(mockTasks[0]));
    service._tasksGroup.next(service._tasksGroup.getValue().push(mockTasks[1]));
    service._tasksGroup.next(service._tasksGroup.getValue().push(mockTasks[2]));
    service._tasksGroup.next(service._tasksGroup.getValue().push(mockTasks[3]));

    //Call service method
    service.deleteTaskFromGroup(mockGroup, mockTaskDeleted);

    //Create the mockCall
    const reqTasks = httpTestingController.expectOne(service['API_URL'] + '/api/tasks/deleteFromGroup');

    reqTasks.flush({
      message: 'Succes'
    });

    //Expect request method
    expect(reqTasks.request.method).toEqual('POST');
    //Expect request body
    expect(reqTasks.request.body.groupId).toEqual(mockGroup._id);
    expect(reqTasks.request.body.taskId).toEqual(mockTaskDeleted._id);
    //Expect request parameters
    expect(reqTasks.request.params.keys().length).toBe(0);
    //Expect the returned data
    expect(service._tasksGroup.getValue().size).toEqual(3);
    expect(service._tasksGroup.getValue().get(0).name).toEqual('Task2');
    expect(service._tasksGroup.getValue().get(1).name).toEqual('Task3');
    expect(service._tasksGroup.getValue().get(2).name).toEqual('Task4');
  });

  it('updateTask', () => {
    let mockGroup = testService.getGroupByName('Group1');
    let mockTask = testService.getTaskByName('Task1');

    //Call service method
    service.updateTask(mockGroup, mockTask);

    //Create the mockCall
    const reqTasks = httpTestingController.expectOne(service['API_URL'] + '/api/tasks/update');

    reqTasks.flush({
      message: 'Succes'
    });

    //Expect request method
    expect(reqTasks.request.method).toEqual('POST');
    //Expect request body
    expect(reqTasks.request.body.task).toEqual(mockTask);
    expect(reqTasks.request.body.groupId).toEqual(mockGroup._id);
    //Expect request parameters
    expect(reqTasks.request.params.keys().length).toBe(0);
  });

  it('getTaskByUser', () => {
    //Get mock data
    let mockUser = testService.getUserByMail('user1@user.com');
    let mockTasks = testService.getTaskByUserId(mockUser._id);

    //Call service method
    service.getTaskByUser(mockUser).subscribe(res => {
      console.log(res);
    });

    //Create the mockCall
    const reqTasks = httpTestingController.expectOne(service['API_URL'] + '/api/tasks/getByUser' + mockUser._id);

    reqTasks.flush({
      message: "Success",
      tasks: mockTasks
    });

    //Expect request method
    expect(reqTasks.request.method).toEqual('GET');
    //Expect request parameters
    expect(reqTasks.request.params.keys().length).toBe(0);
  });

  it('reasignTasks', () => {
    let mockGroup = testService.getGroupByName('Group1');

    //Call service method
    service.reasignTasks(mockGroup);

    //Create the mockCall
    const reqTasks = httpTestingController.expectOne(service['API_URL'] + '/api/tasks/reasign');

    reqTasks.flush({
      message: 'Succes'
    });

    //Expect request method
    expect(reqTasks.request.method).toEqual('POST');
    //Expect request body
    expect(reqTasks.request.body.groupId).toEqual(mockGroup._id);
    //Expect request parameters
    expect(reqTasks.request.params.keys().length).toBe(0);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
