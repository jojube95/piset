import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { GroupUpdateComponent } from './group-update.component';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {GroupStorageService} from '../../../services/group-storage.service';
import {TestService} from '../../../services/test.service';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {Group} from '../../../model/group';

describe('GroupUpdateComponent', () => {
  let component: GroupUpdateComponent;
  let fixture: ComponentFixture<GroupUpdateComponent>;
  let el: DebugElement;

  let groupStorageService: any;
  let testService: any;

  let httpTestingController: HttpTestingController;

  const mockDialogRef = {
    close: jasmine.createSpy('close'),
    open: jasmine.createSpy('open')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupUpdateComponent ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule, ReactiveFormsModule, MatDialogModule],
      providers: [GroupStorageService, TestService, {
        provide: MatDialogRef,
        useValue: mockDialogRef
      },
        {
          provide: MAT_DIALOG_DATA,
          useValue: new Group('Group1', 'g1')
        }]
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

  it('group form init date', () => {
    let name = component.formUpdateGroup.controls['name'];

    expect(name.value).toEqual(component.group.name);

  })

  it('validations and enabled/disabled buttons of update group form', () => {
    //Check form validation
    let name = component.formUpdateGroup.controls['name'];


    name.setValue('');
    fixture.detectChanges();

    expect(name.hasError('required')).toBe(true);
    expect(el.query(By.css('#updateButton')).nativeElement.disabled).toBeTruthy();

    name.setValue('Group2');
    fixture.detectChanges();

    expect(name.hasError('required')).toBe(false);

  });

  it('click update group should call service funtion', () => {
    let onUpdateSpy = spyOn(component, 'onUpdate').and.callThrough();
    let updateGroupSpy = spyOn(groupStorageService, 'updateGroup');


    expect(onUpdateSpy).not.toHaveBeenCalled();
    expect(updateGroupSpy).not.toHaveBeenCalled();

    component.onUpdate();

    expect(onUpdateSpy).toHaveBeenCalled();
    expect(updateGroupSpy).toHaveBeenCalledWith(component.group);
  });
});
