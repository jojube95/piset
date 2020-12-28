import { Injectable } from '@angular/core';
import {Group} from '../model/group';
import {Task} from '../model/task';
import {List} from 'immutable';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestService {
    private API_URL = environment.API_URL;
  constructor(private http: HttpClient) { }

  restoreDatabase(database: String) {
    return this.http.get<{message: string, tasks: any}>(this.API_URL + '/api/test/restoreDatabase' + database).subscribe(
        res => {
          console.log(res);
        },
        err => console.log("Error retrieving Todos")
    );
  }

}
