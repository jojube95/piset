export class Penalty {
  date: Date;
  amount: number;
  _id: string;
  userId: string;
  userName: string;
  groupId: string;
  subtaskId: string;
  subtaskName: string;

  constructor(amount: number, date: Date, userName: string, subtaskName: string, userId?: string, groupId?: string, subtaskId?: string, _id?: string) {
    this.amount = amount;
    this.date = date;
    this.userName = userName;
    this.subtaskName = subtaskName;
    this._id = _id || null;
    this.userId = userId || null;
    this.groupId = groupId || null;
    this.subtaskId = subtaskId || null;
  }
}
