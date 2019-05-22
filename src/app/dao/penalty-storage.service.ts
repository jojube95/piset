import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Group} from '../model/group';
import {UserModel} from '../model/userModel';
import {SubTask} from '../model/subTask';
import {Penalty} from '../model/penalty';

@Injectable({
  providedIn: 'root'
})
export class PenaltyStorageService {

  constructor(private af: AngularFireDatabase) { }

  getGroupPenaltys(group: Group){

  }

  getUserPenaltys(group: Group, user: UserModel){

  }

  createUserPenalty(group: Group, user: UserModel, subtask: SubTask, penalty: Penalty){

  }

  updateUserPenalty(group: Group, user: UserModel, subtask: SubTask, penalty: Penalty){

  }

  deleteUserPenalty(group: Group, user: UserModel, subtask: SubTask, penalty: Penalty){

  }


}
