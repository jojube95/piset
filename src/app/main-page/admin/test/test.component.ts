import { Component, OnInit } from '@angular/core';
import {TestService} from '../../../services/test.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  private production = environment.production;

  constructor(private testService: TestService) { }

  ngOnInit() {}

  restoreDatabase(database){
    this.testService.restoreDatabase(database);
  }

  exportDatabase(database){
    if(confirm('Are you sure?')){
      this.testService.exportDatabase(database);
    }
  }

}
