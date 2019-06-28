import {UserModel} from './userModel';
import {SubTask} from './subTask';
import { firestore} from 'firebase';

export class Penalty {
  date: firestore.Timestamp;
  amount: number;
  id: string;
  userId: string;
  groupId: string;
  subtaskId: string;

  constructor(amount: number, date: firestore.Timestamp, userId?: string, groupId?: string, subtaskId?: string, id?: string) {
    this.amount = amount;
    this.date = date;
    this.id = id || null;
    this.userId = userId || null;
    this.groupId = groupId || null;
    this.subtaskId = subtaskId || null;
  }
}
