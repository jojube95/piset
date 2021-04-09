import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GroupUpdateComponent } from './group-update.component';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {GroupStorageService} from '../../../services/group-storage.service';
import {TestService} from '../../../services/test.service';

xdescribe('GroupUpdateComponent', () => {
  let component: GroupUpdateComponent;
  let fixture: ComponentFixture<GroupUpdateComponent>;
  let el: DebugElement;

  let groupStorageService: any;
  let testService: any;

  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupUpdateComponent ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule, ReactiveFormsModule],
      providers: [GroupStorageService, TestService]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(GroupUpdateComponent);
      testService = TestBed.get(TestService);
      component = fixture.componentInstance;
      component.group = testService.getGroupByName('Group1');
      el = fixture.debugElement;
      groupStorageService = TestBed.get(GroupStorageService);
      httpTestingController = TestBed.get(HttpTestingController);
      fixture.detectChanges();
    });


  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validations and enabled/disabled buttons of update group form', () => {
    let name = component.formUpdateGroup.controls['name'];

    let updateButton = el.query(By.css('#updateButton'));
    let inputName = el.query(By.css('#name'));

    expect(updateButton.nativeElement.disabled).toBeTruthy();

    name.setValue('');
    fixture.detectChanges();
    expect(name.hasError('required')).toBe(true);

    expect(updateButton.nativeElement.disabled).toBeTruthy();

    name.setValue('Test');
    inputName.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(updateButton.nativeElement.disabled).toBeFalsy();
  });

  it('update group should update group on list', () => {
    //Get the form field
    let name = component.formUpdateGroup.controls['name'];

    //Spy functions, should call through because we are going to spy the http call and the observable with mock data
    let updateGroupSpy = spyOn(component, 'onUpdate').and.callThrough();
    let updateGroupServiceSpy = spyOn(groupStorageService, 'updateGroup').and.callThrough();

    //Define mock data
    let groupMockName = 'TestGroup';

    //Complete form
    name.setValue(groupMockName);

    //SpyMethods to not have been colled yet
    expect(updateGroupSpy).not.toHaveBeenCalled();
    expect(updateGroupServiceSpy).not.toHaveBeenCalled();

    //Call spy method addGroup
    component.onUpdate();

    //SpyMethods should have been called
    expect(updateGroupSpy).toHaveBeenCalled();
    expect(updateGroupServiceSpy).toHaveBeenCalled();

    //Mock the http request
    const reqUsers = httpTestingController.expectOne(groupStorageService.API_URL + '/api/groups/update');

    reqUsers.flush({
      message: "Success"
    });

    //Check if groups retrive correctly
    expect(groupStorageService._groups.getValue().get(0).name).toBe(groupMockName);
  });
});
