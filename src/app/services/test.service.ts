import { Injectable } from '@angular/core';
import {Group} from '../model/group';
import {Task} from '../model/task';
import {List} from 'immutable';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  restoreDatabase(database: String) {
    return this.http.get<{message: string, tasks: any}>('http://localhost:3000/api/test/restoreDatabase' + database).subscribe(
        res => {
          console.log(res);
        },
        err => console.log("Error retrieving Todos")
    );
  }

}
