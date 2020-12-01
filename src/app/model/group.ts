import {User} from './user';

export class Group {
  _id: string;
  name: string;
  users: User[];

  constructor(_id: string, name: string, users: User[]){
    this._id = _id;
    this.name = name;
    this.users = users;
  }



}
