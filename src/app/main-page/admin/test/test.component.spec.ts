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
      fixture.autoDetectChanges();
    });


  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('at start no service method is executed', () => {
    const componentNextWeekSpy = spyOn(component, 'nextWeek');
    const componentRestoreDatabaseSpy = spyOn(component, 'restoreDatabase');
    const componentExportDatabaseSpy = spyOn(component, 'exportDatabase');

    const serviceNextWeekSpy = spyOn(testService, 'nextWeek');
    const serviceRestoreDatabaseSpy = spyOn(testService, 'restoreDatabase');
    const serviceExportDatabaseSpy = spyOn(testService, 'exportDatabase');

    expect(componentNextWeekSpy).not.toHaveBeenCalled();
    expect(componentRestoreDatabaseSpy).not.toHaveBeenCalled();
    expect(componentExportDatabaseSpy).not.toHaveBeenCalled();
    expect(serviceNextWeekSpy).not.toHaveBeenCalled();
    expect(serviceRestoreDatabaseSpy).not.toHaveBeenCalled();
    expect(serviceExportDatabaseSpy).not.toHaveBeenCalled();
  });

  it('restore desa database', () => {
    const componentRestoreDatabaseSpy = spyOn(component, 'restoreDatabase').and.callThrough();
    const serviceRestoreDatabaseSpy = spyOn(testService, 'restoreDatabase');

    const restoreDesa =  el.query(By.css('#restoreDesa'));

    restoreDesa.nativeElement.click();

    expect(componentRestoreDatabaseSpy).toHaveBeenCalledWith('piset-desa');
    expect(serviceRestoreDatabaseSpy).toHaveBeenCalledWith('piset-desa');
  });

  it('restore test database', () => {
    const componentRestoreDatabaseSpy = spyOn(component, 'restoreDatabase').and.callThrough();
    const serviceRestoreDatabaseSpy = spyOn(testService, 'restoreDatabase');

    const restoreTest =  el.query(By.css('#restoreTest'));

    restoreTest.nativeElement.click();

    expect(componentRestoreDatabaseSpy).toHaveBeenCalledWith('piset-test');
    expect(serviceRestoreDatabaseSpy).toHaveBeenCalledWith('piset-test');


  });

  it('export desa database', () => {
    const componentExportDatabaseSpy = spyOn(component, 'exportDatabase').and.callFake(() => {
      testService.exportDatabase('piset-desa');
    });

    const serviceExportDatabaseSpy = spyOn(testService, 'exportDatabase');

    const exportDesa =  el.query(By.css('#exportDesa'));

    exportDesa.nativeElement.click();

    expect(componentExportDatabaseSpy).toHaveBeenCalledWith('piset-desa');
    expect(serviceExportDatabaseSpy).toHaveBeenCalledWith('piset-desa');

  });

  it('export test database', () => {
    const componentExportDatabaseSpy = spyOn(component, 'exportDatabase').and.callFake(() => {
      testService.exportDatabase('piset-test');
    });

    const serviceExportDatabaseSpy = spyOn(testService, 'exportDatabase');

    const exportTest =  el.query(By.css('#exportTest'));

    exportTest.nativeElement.click();

    expect(componentExportDatabaseSpy).toHaveBeenCalledWith('piset-test');
    expect(serviceExportDatabaseSpy).toHaveBeenCalledWith('piset-test');
  });

  it('next week', () => {
    const componentNextWeekSpy = spyOn(component, 'nextWeek').and.callThrough();
    const serviceNextWeekSpy = spyOn(testService, 'nextWeek');

    const nextWeek =  el.query(By.css('#nextWeek'));

    nextWeek.nativeElement.click();

    expect(componentNextWeekSpy).toHaveBeenCalled();
    expect(serviceNextWeekSpy).toHaveBeenCalled();

  });
});
