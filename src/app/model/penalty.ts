import {UserModel} from './userModel';
import {SubTask} from './subTask';
import { Timestamp } from '@google-cloud/firestore';

export class Penalty {
  amount: number;
  date: Timestamp;
  user: UserModel;
  subtask: SubTask;
  key: string;

  constructor(amount: number, date: Timestamp, user?: UserModel, subtask?: SubTask, key?: string) {
    this.amount = amount;
    this.date = date;
    this.user = user || null;
    this.subtask = subtask || null;
    this.key = key || null;
  }
}
