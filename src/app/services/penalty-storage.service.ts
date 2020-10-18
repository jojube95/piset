import { Injectable } from '@angular/core';
import {Group} from '../model/group';
import {Penalty} from '../model/penalty';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PenaltyStorageService {

  constructor(private http: HttpClient) {}

  getFilteredPenalties(group: Group): Observable<Penalty[]> {
    return this.http.get<{message: string, groups: any}>('http://localhost:3000/api/penalties/getByGroup' + group._id).pipe(map((groupData) =>{
      return groupData.groups.map((group) => {
        return {
          id: group.id,
          name: group.name,
          users: group.users
        }
      });
    }));
  }


  createPenalty(group: Group, penalty: Penalty) {
    penalty.groupId = group._id;
    this.http.post('http://localhost:3000/api/penalties/addPenalty', {penalty: penalty}).subscribe(response => {
      console.log(response);
    });
  }

  deleteGroupPenalty(penalty: Penalty){
    /*
    this.firestore.collection('penaltys').doc(penalty.id).delete();
    */
  }


}
