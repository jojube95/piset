export class Task{
  _id: string;
  name: string;
  description: string;
  groupId: string;
  userId: string;
  userName: string;
  dateIni: Date;
  dateEnd: Date;
  estimatedTime: number;
  state: string;

  constructor(name: string, description: string, groupId: string, userId?: string, userName?: string, dateIni?: Date, dateEnd?: Date,
              estimatedTime?: number, state?: string, _id?: string){
    this.name = name;
    this.description = description;
    this.groupId = groupId;
    this.userId = userId || null;
    this.userName = userName || null;
    this.dateIni = dateIni || null;
    this.dateEnd = dateEnd || null;
    this.estimatedTime = estimatedTime || null;
    this.state = state || null;
    this._id = _id || null;
  }
}
