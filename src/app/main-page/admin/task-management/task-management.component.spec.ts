import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TaskManagementComponent} from './task-management.component';

xdescribe('TaskManagementComponent', () => {
  let component: TaskManagementComponent;
  let fixture: ComponentFixture<TaskManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskManagementComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('at start no group is selected', () => {

  });

  it('display groups on group list when click select groups', () => {

  });

  it('display tasks on select group from list', () => {

  });

  it('display subtasks on select task from list', () => {

  });

  it('delete task and delete from list', () => {

  });

  it('delete subtask and delete from list', () => {

  });

  it('update task button dont show until task is clicked', () => {

  });

  it('update task should open update task form with clicked task data', () => {

  });

  it('update task update task on list', () => {

  });

  it('click back on update task should hide form', () => {

  });

  it('add task shoould add task on list', () => {

  });

  it('add subtask shoould add subtask on list', () => {

  });
});
