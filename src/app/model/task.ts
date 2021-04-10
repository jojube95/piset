import {State} from './state';

export class Task{
  _id: string;
  name: string;
  description: string;
  groupId: string;
  groupName: string;
  userId: string;
  userName: string;
  dateIni: Date;
  dateEnd: Date;
  estimatedTime: number;
  state: State;

  constructor(name: string, description: string, groupId: string, groupName: string, userId?: string, userName?: string, dateIni?: Date, dateEnd?: Date,
              estimatedTime?: number, state?: State, _id?: string){
    this.name = name;
    this.description = description;
    this.groupId = groupId;
    this.groupName = groupName;
    this.userId = userId || null;
    this.userName = userName || null;
    this.dateIni = dateIni || null;
    this.dateEnd = dateEnd || null;
    this.estimatedTime = estimatedTime || null;
    this.state = state || null;
    this._id = _id || null;
  }
}
