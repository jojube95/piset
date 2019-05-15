import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenaltyManagementComponent } from './penalty-management.component';

describe('PenaltyManagementComponent', () => {
  let component: PenaltyManagementComponent;
  let fixture: ComponentFixture<PenaltyManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenaltyManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenaltyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
