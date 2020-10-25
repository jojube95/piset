import { Injectable } from '@angular/core';
import {Group} from '../model/group';
import {Penalty} from '../model/penalty';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {List} from "immutable";

@Injectable({
  providedIn: 'root'
})
export class PenaltyStorageService {

  public _penaltys: BehaviorSubject<List<Penalty>> = new BehaviorSubject(List([]));

  constructor(private http: HttpClient) {}

  getFilteredPenalties(group: Group) {
    return this.http.get<{message: string, penalties: any}>('http://localhost:3000/api/penalties/getByGroup' + group._id).subscribe(
      res => {
        console.log(res);
        let penalties = (<Object[]>res.penalties).map((penalty: any) =>
          new Penalty(penalty.mount, penalty.date, penalty.userName, penalty.subtaskName, penalty.userId, penalty.groupId, penalty.subtaskId, penalty._id));

        this._penaltys.next(List(penalties));
      },
      err => console.log("Error retrieving Todos")
    );
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
