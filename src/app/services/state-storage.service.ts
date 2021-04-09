import { Injectable } from '@angular/core';
import {Group} from '../model/group';
import {List} from 'immutable';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject} from 'rxjs';
import {State} from '../model/state';

@Injectable({
  providedIn: 'root'
})
export class StateStorageService {
  private API_URL = environment.API_URL;
  public _states: BehaviorSubject<List<State>> = new BehaviorSubject(List([]));

  constructor(private http: HttpClient) { }


  getStates() {
    this.http.get<{message: string, states: any}>(this.API_URL + '/api/states/get').subscribe(res => {
          let states = (<Object[]>res.states).map((state: any) =>
              new State(state.name, state._id));
          this._states.next(List(states));
        },
        err => console.log("Error retrieving Todos")
    );
  }
}
