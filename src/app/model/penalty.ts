import {UserModel} from './userModel';
import {SubTask} from './subTask';

export class Penalty {
  amount: number;
  date: Date;
  user?: UserModel;
  subtask?: SubTask;
  key?: string;

  constructor(amount: number, date: Date, user?: UserModel, subtask?: SubTask, key?: string) {
    this.amount = amount;
    this.date = date;
    this.user = user;
    this.subtask = subtask;
    this.key = key;
  }
}
