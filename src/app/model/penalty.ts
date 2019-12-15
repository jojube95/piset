export class Penalty {
  date: Date;
  amount: number;
  _id: string;
  userId: string;
  userName: string;
  groupId: string;
  subtaskId: string;
  subtaskName: string;

  constructor(amount: number, date: Date, userId?: string, groupId?: string, subtaskId?: string, _id?: string) {
    this.amount = amount;
    this.date = date;
    this._id = _id || null;
    this.userId = userId || null;
    this.groupId = groupId || null;
    this.subtaskId = subtaskId || null;
  }
}
