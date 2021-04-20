import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TestComponent} from './test.component';
import {DebugElement} from '@angular/core';
import {TestService} from '../../../services/test.service';
import {By} from '@angular/platform-browser';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('TestComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let el: DebugElement;

  let testService: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestComponent ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule],
      providers: [TestService]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      testService = TestBed.get(TestService);
      fixture.detectChanges();
      fixture.autoDetectChanges()
    });


  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('at start no service method is executed', () => {
    let componentNextWeekSpy = spyOn(component, 'nextWeek');
    let componentRestoreDatabaseSpy = spyOn(component, 'restoreDatabase');
    let componentExportDatabaseSpy = spyOn(component, 'exportDatabase');

    let serviceNextWeekSpy = spyOn(testService, 'nextWeek');
    let serviceRestoreDatabaseSpy = spyOn(testService, 'restoreDatabase');
    let serviceExportDatabaseSpy = spyOn(testService, 'exportDatabase');

    expect(componentNextWeekSpy).not.toHaveBeenCalled();
    expect(componentRestoreDatabaseSpy).not.toHaveBeenCalled();
    expect(componentExportDatabaseSpy).not.toHaveBeenCalled();
    expect(serviceNextWeekSpy).not.toHaveBeenCalled();
    expect(serviceRestoreDatabaseSpy).not.toHaveBeenCalled();
    expect(serviceExportDatabaseSpy).not.toHaveBeenCalled();
  });

  it('restore desa database', () => {
    let componentRestoreDatabaseSpy = spyOn(component, 'restoreDatabase').and.callThrough();
    let serviceRestoreDatabaseSpy = spyOn(testService, 'restoreDatabase');

    let restoreDesa =  el.query(By.css('#restoreDesa'));

    restoreDesa.nativeElement.click();

    expect(componentRestoreDatabaseSpy).toHaveBeenCalledWith('piset-desa');
    expect(serviceRestoreDatabaseSpy).toHaveBeenCalledWith('piset-desa');
  });

  it('restore test database', () => {
    let componentRestoreDatabaseSpy = spyOn(component, 'restoreDatabase').and.callThrough();
    let serviceRestoreDatabaseSpy = spyOn(testService, 'restoreDatabase');

    let restoreTest =  el.query(By.css('#restoreTest'));

    restoreTest.nativeElement.click();

    expect(componentRestoreDatabaseSpy).toHaveBeenCalledWith('piset-test');
    expect(serviceRestoreDatabaseSpy).toHaveBeenCalledWith('piset-test');


  });

  it('export desa database', () => {
    let componentExportDatabaseSpy = spyOn(component, 'exportDatabase').and.callFake(() => {
      testService.exportDatabase('piset-desa');
    });

    let serviceExportDatabaseSpy = spyOn(testService, 'exportDatabase');

    let exportDesa =  el.query(By.css('#exportDesa'));

    exportDesa.nativeElement.click();

    expect(componentExportDatabaseSpy).toHaveBeenCalledWith('piset-desa');
    expect(serviceExportDatabaseSpy).toHaveBeenCalledWith('piset-desa');

  });

  it('export test database', () => {
    let componentExportDatabaseSpy = spyOn(component, 'exportDatabase').and.callFake(() => {
      testService.exportDatabase('piset-test');
    });

    let serviceExportDatabaseSpy = spyOn(testService, 'exportDatabase');

    let exportTest =  el.query(By.css('#exportTest'));

    exportTest.nativeElement.click();

    expect(componentExportDatabaseSpy).toHaveBeenCalledWith('piset-test');
    expect(serviceExportDatabaseSpy).toHaveBeenCalledWith('piset-test');
  });

  it('next week', () => {
    let componentNextWeekSpy = spyOn(component, 'nextWeek').and.callThrough();
    let serviceNextWeekSpy = spyOn(testService, 'nextWeek');

    let nextWeek =  el.query(By.css('#nextWeek'));

    nextWeek.nativeElement.click();

    expect(componentNextWeekSpy).toHaveBeenCalled();
    expect(serviceNextWeekSpy).toHaveBeenCalled();

  });
});
