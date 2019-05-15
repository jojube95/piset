export class UserModel {
  uid: string;
  mail: string;
  password: string;
  name: string;
  secondName: string;
  admin: boolean;

  constructor(mail: string, password: string, name: string, secondName: string, admin: boolean) {
    this.mail = mail;
    this.password = password;
    this.name = name;
    this.secondName = secondName;
    this.admin = admin;
  }

  setUserId(userId: string) {
    this.uid = userId;
  }

}
