import {UserModel} from './userModel';
import {SubTask} from './subTask';

export class Penalty {
  date: Date;
  amount: number;
  id: string;
  userId: string;
  userName: string;
  groupId: string;
  groupName: string;
  subtaskId: string;
  subtaskName: string;

  constructor(amount: number, date: Date, userId?: string, groupId?: string, subtaskId?: string, id?: string) {
    this.amount = amount;
    this.date = date;
    this.id = id || null;
    this.userId = userId || null;
    this.groupId = groupId || null;
    this.subtaskId = subtaskId || null;
  }
}
