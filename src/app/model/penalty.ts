import {UserModel} from './userModel';
import {SubTask} from './subTask';
import { firestore} from 'firebase';

export class Penalty {
  date: firestore.Timestamp;
  user: UserModel;
  subtask: SubTask;
  amount: number;
  key: string;

  constructor(amount: number, date: firestore.Timestamp, user?: UserModel, subtask?: SubTask, key?: string) {
    this.amount = amount;
    this.date = date;
    this.user = user || null;
    this.subtask = subtask || null;
    this.key = key || null;
  }
}
