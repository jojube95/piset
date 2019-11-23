import {User} from './user';

export class Group {
  name: string;
  users: User[];
  id: string;

  constructor(name: string, users: User[]){
    this.name = name;
    this.users = users;
  }

}
