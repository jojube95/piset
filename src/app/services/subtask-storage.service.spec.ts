import { TestBed } from '@angular/core/testing';

import { SubtaskStorageService } from './subtask-storage.service';
import {TestService} from './test.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Task} from '../model/task';
import {SubTask} from '../model/subTask';

describe('SubtaskStorageService', () => {
  let service: SubtaskStorageService;

  let testService: TestService;
  let httpTestingController: HttpTestingController;

  let getGroupSubtasksSpy: any;
  let getUserSubtasksSpy: any;
  let getTaskSubtasksSpy: any;
  let addSubtaskToTaskSpy: any;
  let updateSubtaskSpy: any;
  let deleteSubtaskSpy: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [TestService]
    });
    service = TestBed.inject(SubtaskStorageService);
    testService = TestBed.inject(TestService);
    httpTestingController = TestBed.get(HttpTestingController);

    getGroupSubtasksSpy = spyOn(service, 'getGroupSubtasks').and.callThrough();
    getUserSubtasksSpy = spyOn(service, 'getUserSubtasks').and.callThrough();
    getTaskSubtasksSpy = spyOn(service, 'getTaskSubtasks').and.callThrough();
    addSubtaskToTaskSpy = spyOn(service, 'addSubtaskToTask').and.callThrough();
    updateSubtaskSpy = spyOn(service, 'updateSubtask').and.callThrough();
    deleteSubtaskSpy = spyOn(service, 'deleteSubtask').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();

    expect(getGroupSubtasksSpy).not.toHaveBeenCalled();
    expect(getUserSubtasksSpy).not.toHaveBeenCalled();
    expect(getTaskSubtasksSpy).not.toHaveBeenCalled();
    expect(addSubtaskToTaskSpy).not.toHaveBeenCalled();
    expect(updateSubtaskSpy).not.toHaveBeenCalled();
    expect(deleteSubtaskSpy).not.toHaveBeenCalled();
  });

  it('getGroupSubtasks', () => {
    //Get mock data
    let mockGroup = testService.getGroupByName('Group1');
    let mockSubTasks = testService.getSubtasksByGroupId(mockGroup._id);

    //Call service method
    service.getGroupSubtasks(mockGroup);

    //Create the mockCall
    const reqSubTasks = httpTestingController.expectOne(service['API_URL'] + '/api/subtasks/getByGroup' + mockGroup._id);

    reqSubTasks.flush({
      subtasks: mockSubTasks
    });

    //Expect request method
    expect(reqSubTasks.request.method).toEqual('GET');
    //Expect request parameters
    expect(reqSubTasks.request.params.keys().length).toBe(0);
    //Expect the returned data
    expect(service._subtasksGroup.getValue().size).toEqual(8);
    expect(service._subtasksGroup.getValue().get(0).name).toEqual('Subtask1');
    expect(service._subtasksGroup.getValue().get(1).name).toEqual('Subtask2');
    expect(service._subtasksGroup.getValue().get(2).name).toEqual('Subtask3');
    expect(service._subtasksGroup.getValue().get(3).name).toEqual('Subtask4');
    expect(service._subtasksGroup.getValue().get(4).name).toEqual('Subtask5');
    expect(service._subtasksGroup.getValue().get(5).name).toEqual('Subtask6');
    expect(service._subtasksGroup.getValue().get(6).name).toEqual('Subtask7');
    expect(service._subtasksGroup.getValue().get(7).name).toEqual('Subtask8');
  });

  it('getUserSubtasks', () => {
    //Get mock data
    let mockUser = testService.getUserByMail('user1@user.com')
    let mockSubTasks = testService.getSubtasksByUserId(mockUser._id);

    //Call service method
    service.getUserSubtasks(mockUser);

    //Create the mockCall
    const reqSubTasks = httpTestingController.expectOne(service['API_URL'] + '/api/subtasks/getByUser' + mockUser._id);

    reqSubTasks.flush({
      subtasks: mockSubTasks
    });

    //Expect request method
    expect(reqSubTasks.request.method).toEqual('GET');
    //Expect request parameters
    expect(reqSubTasks.request.params.keys().length).toBe(0);
    //Expect the returned data
    expect(service._subtasksUser.getValue().size).toEqual(2);
    expect(service._subtasksUser.getValue().get(0).name).toEqual('Subtask1');
    expect(service._subtasksUser.getValue().get(1).name).toEqual('Subtask2');
  });

  it('getTaskSubtasks', () => {
    //Get mock data
    let mockTask = testService.getTaskByName('Task1');
    let mockSubTasks = testService.getSubtasksByTaskId(mockTask._id);

    //Call service method
    service.getTaskSubtasks(mockTask);

    //Create the mockCall
    const reqSubTasks = httpTestingController.expectOne(service['API_URL'] + '/api/subtasks/getByTask' + mockTask._id);

    reqSubTasks.flush({
      subtasks: mockSubTasks
    });

    //Expect request method
    expect(reqSubTasks.request.method).toEqual('GET');
    //Expect request parameters
    expect(reqSubTasks.request.params.keys().length).toBe(0);
    //Expect the returned data
    expect(service._subtasksTask.getValue().size).toEqual(2);
    expect(service._subtasksTask.getValue().get(0).name).toEqual('Subtask1');
    expect(service._subtasksTask.getValue().get(1).name).toEqual('Subtask2');
  });

  it('addSubtaskToTask', () => {
    //Get mock data
    let mockGroup = testService.getGroupByName('Group1');
    let mockTask = testService.getTaskByName('Task1');
    let mockSubTasks = new SubTask('Subtask11', 'Subtask11', 0, false, null, mockTask._id, mockGroup._id, null, null);

    //Call service method
    service.addSubtaskToTask(mockSubTasks, mockTask, mockGroup);

    //Create the mockCall
    const reqTasks = httpTestingController.expectOne(service['API_URL'] + '/api/subtasks/addToTask');

    reqTasks.flush({
      message: 'Succes'
    });

    //Expect request method
    expect(reqTasks.request.method).toEqual('POST');
    //Expect request body
    expect(reqTasks.request.body.subtask).toEqual(mockSubTasks);
    expect(reqTasks.request.body.taskId).toEqual(mockTask._id);
    expect(reqTasks.request.body.groupId).toEqual(mockGroup._id);
    //Expect request parameters
    expect(reqTasks.request.params.keys().length).toBe(0);
    //Expect the returned data
    expect(service._subtasksTask.getValue().size).toEqual(1);
    expect(service._subtasksTask.getValue().get(0).name).toEqual('Subtask11');
  });

  it('updateSubtask', () => {
    let mockGroup = testService.getGroupByName('Group1');
    let mockSubtask = testService.getSubtasksByGroupId(mockGroup._id)[0];

    //Call service method
    service.updateSubtask(mockSubtask);

    //Create the mockCall
    const reqTasks = httpTestingController.expectOne(service['API_URL'] + '/api/subtasks/update');

    reqTasks.flush({
      message: 'Succes'
    });

    //Expect request method
    expect(reqTasks.request.method).toEqual('POST');
    //Expect request body
    expect(reqTasks.request.body.subtask).toEqual(mockSubtask);
    //Expect request parameters
    expect(reqTasks.request.params.keys().length).toBe(0);
  });

  it('deleteSubtask', () => {
    //Get mock data
    let mockTask = testService.getTaskByName('Task1');
    let mockSubtasks = testService.getSubtasksByTaskId(mockTask._id);
    let mockSubtaskDeleted = mockSubtasks[0];

    //Populate initial list with mock data
    service._subtasksTask.next(service._subtasksTask.getValue().push(mockSubtasks[0]));
    service._subtasksTask.next(service._subtasksTask.getValue().push(mockSubtasks[1]));

    //Call service method
    service.deleteSubtask(mockTask, mockSubtaskDeleted);

    //Create the mockCall
    const reqTasks = httpTestingController.expectOne(service['API_URL'] + '/api/subtasks/deleteFromTask');

    reqTasks.flush({
      message: 'Succes'
    });

    //Expect request method
    expect(reqTasks.request.method).toEqual('POST');
    //Expect request body
    expect(reqTasks.request.body.taskId).toEqual(mockTask._id);
    expect(reqTasks.request.body.subtaskId).toEqual(mockSubtaskDeleted._id);
    //Expect request parameters
    expect(reqTasks.request.params.keys().length).toBe(0);
    //Expect the returned data
    expect(service._subtasksTask.getValue().size).toEqual(1);
    expect(service._subtasksTask.getValue().get(0).name).toEqual('Subtask2');
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
