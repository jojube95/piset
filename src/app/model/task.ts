import { SubTask } from './subTask';

export class Task{
  _id: string;
  name: string;
  groupId: string;
  userId: string;
  userName: string;

  constructor(name: string, _id?: string){
    this.name = name;
    this._id = _id || null;
  }
}
