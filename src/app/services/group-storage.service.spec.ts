import {TestBed} from '@angular/core/testing';
import { GroupStorageService } from './group-storage.service';
import {TestService} from './test.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Group} from '../model/group';

describe('GroupStorageService', () => {
  let service: GroupStorageService;

  let testService: TestService;
  let httpTestingController: HttpTestingController;

  let loadGroupsSpy: any;
  let createGroupSpy: any;
  let deleteGroup: any;

  beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [TestService]
      });
      service = TestBed.inject(GroupStorageService);
      testService = TestBed.inject(TestService);
      httpTestingController = TestBed.get(HttpTestingController);
      loadGroupsSpy = spyOn(service, 'getGroups').and.callThrough();
      createGroupSpy = spyOn(service, 'createGroup').and.callThrough();
      deleteGroup = spyOn(service, 'deleteGroup').and.callThrough();

    });

  it('should be created', () => {
    expect(service).toBeTruthy();

    expect(loadGroupsSpy).not.toHaveBeenCalled();
    expect(createGroupSpy).not.toHaveBeenCalled();
    expect(deleteGroup).not.toHaveBeenCalled();
  });

  it('getGroups', () => {
      //Get mock data
      let mockGroups = testService.getGroups();

      //Call service
      service.getGroups();

      //Create the mockCall
      const reqGroups = httpTestingController.expectOne(service['API_URL'] + '/api/groups/get');

      reqGroups.flush({
        groups: mockGroups
      });

      //Expect request method
      expect(reqGroups.request.method).toEqual('GET');
      //Expect request parameters
      expect(reqGroups.request.params.keys().length).toBe(0);
      //Expect the returned data
      expect(service._groups.getValue().size).toEqual(2);
      expect(service._groups.getValue().get(0).name).toEqual('Group1');
      expect(service._groups.getValue().get(1).name).toEqual('Group2');
  });

  it('createGroup', () => {
      let mockGroup = new Group('Group3');

      //Call service method
      service.createGroup(mockGroup);

      //Create the mockCall
      const reqGroups = httpTestingController.expectOne(service['API_URL'] + '/api/groups/add');

      reqGroups.flush({
          message: 'Succes'
      });

      //Expect request method
      expect(reqGroups.request.method).toEqual('POST');
      //Expect request body
      expect(reqGroups.request.body.group).toEqual(mockGroup);
      //Expect request parameters
      expect(reqGroups.request.params.keys().length).toBe(0);
      //Expect the returned data
      expect(service._groups.getValue().size).toEqual(1);
      expect(service._groups.getValue().get(0).name).toEqual(mockGroup.name);
  });

  it('deleteGroup', () => {
      let deletedGroup = testService.getGroupByName('Group1');
      let mockGroups = testService.getGroups();

      //Populate the list with groups
      service._groups.next(service._groups.getValue().push(mockGroups[0]));
      service._groups.next(service._groups.getValue().push(mockGroups[1]));
      //Call service method
      service.deleteGroup(deletedGroup);

      //Create the mockCall
      const reqGroups = httpTestingController.expectOne(service['API_URL'] + '/api/groups/delete');

      reqGroups.flush({
          message: 'Succes'
      });

      //Expect request method
      expect(reqGroups.request.method).toEqual('POST');
      //Expect request body
      expect(reqGroups.request.body.groupId).toEqual(deletedGroup._id);
      //Expect request parameters
      expect(reqGroups.request.params.keys().length).toBe(0);
      //Expect the returned data
      expect(service._groups.getValue().size).toEqual(1);
      expect(service._groups.getValue().get(0).name).toEqual(mockGroups[1].name);
  });

  it('updateGroup', () => {

  });

  afterEach(() => {
      httpTestingController.verify();
  })
});
