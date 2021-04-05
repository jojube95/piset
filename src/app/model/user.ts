import {UserGroup} from './userGroup';
import {UserAchivement} from './userAchivement';

export class User {
  _id: string;
  mail: string;
  password: string;
  name: string;
  secondName: string;
  admin: boolean;
  groups: UserGroup[];
  achivements: UserAchivement[]

  constructor(mail: string, password: string, name: string, secondName: string, admin: boolean, groups: UserGroup[], achivements: UserAchivement[], _id?: string) {
    this.mail = mail;
    this.password = password;
    this.name = name;
    this.secondName = secondName;
    this.admin = admin;
    this.groups = groups;
    this.achivements = achivements;
    this._id = _id || '';
  }



}
