export class User {
  _id: string;
  mail: string;
  password: string;
  name: string;
  secondName: string;
  admin: boolean;
  groupAdmin: boolean;
  groupDealer: boolean;
  groupId: string;
  groupName: string;

  constructor(mail: string, password: string, name: string, secondName: string, admin: boolean, groupAdmin: boolean, groupDealer: boolean, groupName?: string, _id?: string, groupId?: string) {
    this.mail = mail;
    this.password = password;
    this.name = name;
    this.secondName = secondName;
    this.groupAdmin = groupAdmin;
    this.groupDealer = groupDealer;
    this.groupName = groupName || '';
    this.admin = admin;
    this._id = _id || '';
    this.groupId = groupId || '';
  }



}
