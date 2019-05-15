import {UserModel} from './userModel';

export class Group {
  uid: string;
  name: string;
  users: UserModel[];

  constructor(name: string, users: UserModel[]){
    this.name = name;
    this.users = users;
  }

  setGroupId(groupId: string){
    this.uid = groupId;
  }

}
