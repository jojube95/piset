import {UserModel} from './userModel';

export class Group {
  name: string;
  users: UserModel[];
  id: string;

  constructor(name: string, users: UserModel[]){
    this.name = name;
    this.users = users;
  }

}
