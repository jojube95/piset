export class User {
  _id: string;
  mail: string;
  password: string;
  name: string;
  secondName: string;
  admin: boolean;
  groupAdmin: boolean;
  groupId: string;

  constructor(mail: string, password: string, name: string, secondName: string, admin: boolean, groupAdmin: boolean, _id?: string, groupId?: string) {
    this.mail = mail;
    this.password = password;
    this.name = name;
    this.secondName = secondName;
    this.groupAdmin = groupAdmin;
    this.admin = admin;
    this._id = _id || '';
    this.groupId = groupId || '';
  }



}
