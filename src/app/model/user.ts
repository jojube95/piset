export class User {
  mail: string;
  password: string;
  name: string;
  secondName: string;
  admin: boolean;
  id: string;
  groupId: string;

  constructor(mail: string, password: string, name: string, secondName: string, admin: boolean, id?: string, groupId?: string) {
    this.mail = mail;
    this.password = password;
    this.name = name;
    this.secondName = secondName;
    this.admin = admin;
    this.id = id || '';
    this.groupId = groupId || '';
  }



}
