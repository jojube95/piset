export class User {
  mail: string;
  password: string;
  name: string;
  secondName: string;
  admin: boolean;
  _id: string;
  groupId: string;

  constructor(mail: string, password: string, name: string, secondName: string, admin: boolean, _id?: string, groupId?: string) {
    this.mail = mail;
    this.password = password;
    this.name = name;
    this.secondName = secondName;
    this.admin = admin;
    this._id = _id || '';
    this.groupId = groupId || '';
  }



}
