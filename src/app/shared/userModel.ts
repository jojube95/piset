export class UserModel {
  uid: string;
  username: string;
  mail: string;
  password: string;
  name: string;
  secondName: string;

  constructor(username: string, mail: string, password: string, name: string, secondName: string) {
    this.username = username;
    this.mail = mail;
    this.password = password;
    this.name = name;
    this.secondName = secondName;
  }

  setUserId(userId: string) {
    this.uid = userId;
  }

}
