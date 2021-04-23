import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {List} from 'immutable';
import {Group} from '../model/group';
import {History} from '../model/history';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../model/user';
import { environment } from '../../environments/environment';
import {UserGroup} from '../model/userGroup';
import {Task} from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class HistoryStorageService {
    private API_URL = environment.API_URL;
    public _histories: BehaviorSubject<List<History>> = new BehaviorSubject(List([]));
    public _historiesGroups: BehaviorSubject<List<History>> = new BehaviorSubject(List([]));
    public _userHistory: BehaviorSubject<List<History>> = new BehaviorSubject(List([]));

    constructor(private http: HttpClient) { }

    getUserGroupsHistories(userGroups: UserGroup[]) {
        const params = new HttpParams().set('userGroups', JSON.stringify(userGroups));

        return this.http.get<{message: string, histories: any}>(this.API_URL + '/api/histories/getByUserGroups', {params}).subscribe(
            res => {
                const histories = (res.histories as History[]).map((history: any) =>
                    new History(history.taskId, history.taskName, history.userId, history.userName, history.groupId, history.groupName,
                        history.date, history.action, history.time, history._id));
                this._historiesGroups.next(List(histories));

            },
            err => console.log('Error retrieving Todos')
        );
    }

    getUserHistories(user: User) {
        return this.http.get<{message: string, histories: any}>(this.API_URL + '/api/histories/getByUser' + user._id).subscribe(
            res => {
                const histories = (res.histories as History[]).map((history: any) =>
                  new History(history.taskId, history.taskName, history.userId, history.userName, history.groupId, history.groupName,
                      history.date, history.action, history.time, history._id));
                this._userHistory.next(List(histories));
            },
            err => console.log('Error retrieving histories')
        );
    }

    getGroupHistories(group: Group) {
        return this.http.get<{message: string, histories: any}>(this.API_URL + '/api/histories/getByGroup' + group._id).subscribe(
            res => {
                const histories = (res.histories as History[]).map((history: any) =>
                    new History(history.taskId, history.taskName, history.userId, history.userName, history.groupId, history.groupName,
                        history.date, history.action, history.time, history._id));
                this._histories.next(List(histories));
            },
            err => console.log('Error retrieving Todos')
        );
    }


    createHistory(history: History) {
        this.http.post(this.API_URL + '/api/histories/addHistory', {history}).subscribe(response => {
            this._histories.next(this._histories.getValue().push(history));
        });
    }
}
