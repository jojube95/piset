import {Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import {StateStorageService} from '../../../services/state-storage.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {


  constructor(private stateStorage : StateStorageService) { }

  ngOnInit() {
  }

}
