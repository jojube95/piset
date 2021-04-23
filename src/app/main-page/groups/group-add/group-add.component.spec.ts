import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GroupAddComponent } from './group-add.component';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {GroupStorageService} from '../../../services/group-storage.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';

describe('GroupAddComponent', () => {
  let component: GroupAddComponent;
  let fixture: ComponentFixture<GroupAddComponent>;
  let el: DebugElement;

  let groupStorageService: any;

  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupAddComponent ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule, ReactiveFormsModule],
      providers: [GroupStorageService]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(GroupAddComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      groupStorageService = TestBed.get(GroupStorageService);
      httpTestingController = TestBed.get(HttpTestingController);
      fixture.detectChanges();
    });


  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validations and enabled/disabled buttons of new group form', () => {
    const name = component.formAddGroup.controls['name'];

    const addButton = el.query(By.css('#addButton'));

    expect(addButton.nativeElement.disabled).toBeTruthy();

    name.setValue('');
    fixture.detectChanges();
    expect(name.hasError('required')).toBe(true);

    expect(addButton.nativeElement.disabled).toBeTruthy();

    name.setValue('Test');
    fixture.detectChanges();

    expect(addButton.nativeElement.disabled).toBeFalsy();
  });

  it('add group should add group to list', () => {
    // Get the form field
    const name = component.formAddGroup.controls['name'];

    // Spy functions, should call through because we are going to spy the http call and the observable with mock data
    const addGroupSpy = spyOn(component, 'onAdd').and.callThrough();
    const createGroupSpy = spyOn(groupStorageService, 'createGroup').and.callThrough();

    // Define mock data
    const groupMockName = 'TestGroup';

    // Complete form
    name.setValue(groupMockName);

    // SpyMethods to not have been colled yet
    expect(addGroupSpy).not.toHaveBeenCalled();
    expect(createGroupSpy).not.toHaveBeenCalled();

    // Call spy method addGroup
    component.onAdd();

    // SpyMethods should have been called
    expect(addGroupSpy).toHaveBeenCalled();
    expect(createGroupSpy).toHaveBeenCalled();

    // Mock the http request
    const reqUsers = httpTestingController.expectOne(groupStorageService.API_URL + '/api/groups/add');

    reqUsers.flush({
      message: 'Success'
    });

    // Check if groups retrive correctly
    expect(groupStorageService._groups.getValue().get(0).name).toBe(groupMockName);
  });
});
