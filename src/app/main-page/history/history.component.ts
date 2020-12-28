import { Component, OnInit } from '@angular/core';
import {UserStorageService} from '../../services/user-storage.service';
import {User} from '../../model/user';
import {HistoryStorageService} from '../../services/history-storage.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  minDate: Date;
  maxDate: Date;

  loggedUser: User;

  currentDate: Date;

  constructor(public userStorage: UserStorageService, public historyStorage: HistoryStorageService) {
    this.loggedUser = this.userStorage.getCurrentUser();

    this.currentDate = new Date();

    this.maxDate = new Date(this.currentDate.getFullYear() + 5, 0, 0);
    this.minDate = new Date(this.currentDate.getFullYear() - 5, 0, 1);
    this.historyStorage.getUserHistories(this.loggedUser);
  }

  ngOnInit() {}

  onDateFilterChange(event){
    let date = event.detail.value;
    this.currentDate = new Date(date);
  }

}
