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
import histories from "../../testData/histories.json";
import {User} from '../model/user';
import {History} from '../model/history';

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
            },
            err => console.log("Error retrieving Todos")
        );
      }

    exportDatabase(database) {

        return this.http.get<{message: string, tasks: any}>(this.API_URL + '/api/test/exportDatabase' + database).subscribe(
            res => {
            },
            err => console.log("Error retrieving Todos")
        );


    }

    getUserByMail(mail: string): User{
        return users.find(user => user.mail === mail) as User;
    }

    getGroups(): Group[]{
        return groups as Group[];
    }
    getGroupByName(groupName: string): Group{
        return groups.find(group => group.name === groupName) as Group;
    }

    getUsersByGroupId(groupId: string): User[]{
        return users.filter(user => user.groupId === groupId) as User[];
    }

    getUsersWithoutGroup(): User[]{
        return users.filter(user => user.groupId === null) as User[];
    }

    getTasksByGroupId(groupId: string): Task[]{
        return tasks.filter(task => task.groupId === groupId) as Task[];
    }

    getTaskByName(taskName: string): Task{
        return tasks.find(task => task.name === taskName) as Task;
    }

    getTaskByUserId(userId: string): Task{
        return tasks.find(task => task.userId === userId) as Task;
    }

    getHistoriesByUserId(userId: string): History[]{
        return histories.filter(history => history.userId === userId) as unknown as History[];
    }

    getHistoriesByGroupId(groupId: string): History[]{
        return histories.filter(history => history.groupId === groupId) as unknown as History[];
    }
}
