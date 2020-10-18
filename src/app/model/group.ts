import {User} from './user';

export class Group {
  _id: string;
  name: string;
  users: User[];

  constructor(name: string, users: User[]){
    this.name = name;
    this.users = users;
  }

}
