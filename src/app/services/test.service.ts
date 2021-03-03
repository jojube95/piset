import { Injectable } from '@angular/core';
import {Group} from '../model/group';
import {Task} from '../model/task';
import {List} from 'immutable';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject} from 'rxjs';

import users from "../../testData/users.json";
import groups from "../../testData/groups.json";
import tasks from "../../testData/tasks.json";
import subtasks from "../../testData/subtasks.json";
import invitations from "../../testData/invitations.json";
import histories from "../../testData/histories.json";

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

    getUserByMail(mail: String){
        return users.find(user => user.mail === mail);
    }

    getGroupByName(groupName: String){
        return groups.find(group => group.name === groupName);
    }

    getUsersByGroupId(groupId: string){
        return users.filter(user => user.groupId === groupId);
    }

    getTasksByGroupId(groupId: string){
        return tasks.filter(task => task.groupId === groupId);
    }

    getTaskByName(taskName: String){
        return tasks.find(task => task.name === taskName);
    }

    getSubtasksByTaskId(taskId: string){
        return subtasks.filter(subtask => subtask.taskId === taskId);
    }

    getHistoriesByUserId(userId: string){
        return histories.filter(history => history.userId === userId);
    }
}
