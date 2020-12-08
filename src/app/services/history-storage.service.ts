import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {List} from 'immutable';
import {Group} from '../model/group';
import {History} from '../model/history';
import {Penalty} from '../model/penalty';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class HistoryStorageService {

  public _userHistory: BehaviorSubject<List<History>> = new BehaviorSubject(List([]));

  constructor(private http: HttpClient) { }

  getUserHistories(user: User) {
    return this.http.get<{message: string, histories: any}>('http://localhost:3000/api/histories/getByUser' + user._id).subscribe(
        res => {
          let histories = (<Object[]>res.histories).map((history: any) =>
              new History(history.subtaskId, history.subtaskName, history.subtaskPenalty, history.subtaskDone, history.userId, history.dateIni, history.dateFin));

          this._userHistory.next(List(histories));
        },
        err => console.log("Error retrieving histories")
    );
  }
}
