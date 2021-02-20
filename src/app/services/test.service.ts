import { Injectable } from '@angular/core';
import {Group} from '../model/group';
import {Task} from '../model/task';
import {List} from 'immutable';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {
    private API_URL = environment.API_URL;
    public _currentDate: BehaviorSubject<Date> = new BehaviorSubject(new Date);

    constructor(private http: HttpClient) { }

    getCurrentDate() {
        return this.http.get<{message: string, currentDate: Date}>(this.API_URL + '/api/test/getCurrentDate').subscribe(
            res => {
                this._currentDate.next(res.currentDate);
            },
            err => console.log("Error retrieving Todos")
        );
    }

    nextWeek(){
        return this.http.get<{message: string, currentDate: Date}>(this.API_URL + '/api/test/nextWeek').subscribe(
            res => {
                this._currentDate.next(res.currentDate);
            },
            err => console.log("Error retrieving Todos")
        );
    }

    restoreDatabase(database) {
        return this.http.get<{message: string, tasks: any}>(this.API_URL + '/api/test/restoreDatabase' + database).subscribe(
            res => {
              console.log(res);
            },
            err => console.log("Error retrieving Todos")
        );
      }

    exportDatabase(database) {

        return this.http.get<{message: string, tasks: any}>(this.API_URL + '/api/test/exportDatabase' + database).subscribe(
            res => {
                console.log(res);
            },
            err => console.log("Error retrieving Todos")
        );


    }

}
