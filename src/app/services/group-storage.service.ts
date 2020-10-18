import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Group} from '../model/group';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GroupStorageService {
  constructor(private http: HttpClient) {}

  getGrups(): Observable<Group[]>{
    return this.http.get<{message: string, groups: any}>('http://localhost:3000/api/groups/get').pipe(map((groupData) =>{
      return groupData.groups.map((group) => {
        return {
          _id: group._id,
          name: group.name,
          users: group.users
        }
      });
    }));
  }

  deleteGroup(group: Group){
    this.http.post('http://localhost:3000/api/groups/delete', {groupId: group._id}).subscribe(response => {
      console.log(response);
    });
  }


  createGroup(group: Group){
    this.http.post('http://localhost:3000/api/groups/add', {group: group}).subscribe(response => {
      console.log(response);
    });
  }
}
