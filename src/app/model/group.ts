import {UserModel} from './userModel';

export class Group {
  name: string;
  users: UserModel[];
  key: string;

  constructor(name: string, users: UserModel[]){
    this.name = name;
    this.users = users;
  }

}
