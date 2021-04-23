import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Group} from '../model/group';
import {List} from 'immutable';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupStorageService {
  private API_URL = environment.API_URL;
  public _groups: BehaviorSubject<List<Group>> = new BehaviorSubject(List([]));

  constructor(private http: HttpClient) { }

  get groups(){
    return new Observable(fn => this._groups.subscribe(fn));
  }

  getGroups() {
    this.http.get<{message: string, groups: any}>(this.API_URL + '/api/groups/get').subscribe(res => {
      const groups = (res.groups as Group[]).map((group: any) =>
          new Group(group.name, group._id));

      this._groups.next(List(groups));
      },
      err => console.log('Error retrieving Todos')
    );
  }

  createGroup(group: Group){
    this.http.post(this.API_URL + '/api/groups/add', {group}).subscribe(res => {
      this._groups.next(this._groups.getValue().push(group));
    });
  }

  deleteGroup(deletedGroup: Group){
    this.http.post(this.API_URL + '/api/groups/delete', {groupId: deletedGroup._id}).subscribe(res => {
      const groups: List<Group> = this._groups.getValue();
      const index = groups.findIndex((group) => group._id === deletedGroup._id);
      this._groups.next(groups.delete(index));
    });
  }

  updateGroup(group: Group){
    this.http.post(this.API_URL + '/api/groups/update', {group}).subscribe(response => {
      const groups: List<Group> = this._groups.getValue();
      const index = groups.findIndex((task) => task._id === group._id);
      this._groups.next(groups.set(index, group));
    });
  }
}
