import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {UserModel} from '../model/userModel';
import {AngularFireModule} from 'angularfire2';
import {UserStorageService} from '../dao/user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private router: Router,
    private af: AngularFireModule, private userStorage: UserStorageService) {
  }

  signOut() {
    this.afAuth.auth.signOut().then(
      () => this.router.navigate([''])
    );
  }

  signIn(email: string, password: string) {
    let userLogged: UserModel;
    let logged = false;

    this.userStorage.getObservableUsers().subscribe(users => {
      userLogged = users.find(i => i.mail === email);
      logged = true;
      if (userLogged) {

        this.signinUser(email, password);

      }

    });


  }

 signupUser(userObj: UserModel) {
  firebase.auth().createUserWithEmailAndPassword(userObj.mail, userObj.password)
    .then(
      user => {
        this.userStorage.addUser(userObj);
        this.signinUser(userObj.mail, userObj.password);
      }
    )
    .catch(
      error => alert(error.message)
    );
}

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate(['/main']);
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => this.token = token,

            );
        },

      )
      .catch(
        error => alert(error.message + '\n Test mail: test@test.com \n Test pass: testtest')
      );

  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token;
  }

  getCurrentUser() {
    return this.afAuth.auth.currentUser;
  }

  isAuthenticated() {
    return this.token != null;
  }


}
