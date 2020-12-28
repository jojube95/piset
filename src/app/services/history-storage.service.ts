import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {List} from 'immutable';
import {Group} from '../model/group';
import {History} from '../model/history';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoryStorageService {
    private API_URL = environment.API_URL;
    public _histories: BehaviorSubject<List<History>> = new BehaviorSubject(List([]));
    public _userHistory: BehaviorSubject<List<History>> = new BehaviorSubject(List([]));

  constructor(private http: HttpClient) { }

    getUserHistories(user: User) {
        return this.http.get<{message: string, histories: any}>(this.API_URL + '/api/histories/getByUser' + user._id).subscribe(
            res => {
              let histories = (<Object[]>res.histories).map((history: any) =>
                  new History(history.subtaskId, history.subtaskName, history.subtaskPenalty, history.subtaskDone, history.userId, history.userName, history.dateIni, history.dateFin));
              this._userHistory.next(List(histories));
            },
            err => console.log("Error retrieving histories")
        );
    }

    getFilteredHistories(group: Group) {
        return this.http.get<{message: string, histories: any}>(this.API_URL + '/api/histories/getByGroup' + group._id).subscribe(
            res => {
                let histories = (<Object[]>res.histories).map((history: any) =>
                    new History(history.subtaskId, history.subtaskName, history.subtaskPenalty, history.subtaskDone, history.userId, history.dateIni, history.dateFin, history._id, history.groupId, history.groupName));
                this._histories.next(List(histories));
            },
            err => console.log("Error retrieving Todos")
        );
    }


    createHistory(history: History) {
        this.http.post(this.API_URL + '/api/penalties/addPenalty', {history: history}).subscribe(response => {
            this._histories.next(this._histories.getValue().push(history));
        });
    }
}
