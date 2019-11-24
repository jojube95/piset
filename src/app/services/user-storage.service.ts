import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {map} from 'rxjs/operators';
import { Group } from '../model/group';
import {HttpClient} from '@angular/common/http';
import {AuthService} from "../auth/auth.service";


@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }


  updateUserProfile(user: User) {
    /*
    this.firestore.collection('users').doc(user.id).update(user);

    this.firestore.collection('penaltys', ref => ref.where('userId', '==', user.id)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Penalty;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    ).subscribe(penalty => {
      this.firestore.collection('penaltys').doc(penalty[0].id).update({
        date: penalty[0].date,
        amount: penalty[0].amount,
        userId: user.id,
        userName: user.name,
        groupId: penalty[0].groupId,
        groupName: penalty[0].groupName,
        subtaskId: penalty[0].subtaskId,
        subtaskName: penalty[0].subtaskName
      });
    });*/
  }

  getObservableUsers(): Observable<User[]> {
    return this.http.get<{message: string, users: any}>('http://localhost:3000/api/users/get').pipe(map((userData) =>{
      return userData.users.map((user) => {
        return {
          mail: user.mail,
          password: user.password,
          name: user.name,
          secondName: user.secondName,
          admin: user.admin,
          id: user.id,
          groupId: user.groupId || null
        }
      });
    }));

  }

  public getCurrentUser() {
    return this.authService.getCurrentUser();
  }

  public deleteUserFromGroup(user: User, group: Group){
    /*
    user.groupId = null;
    this.firestore.collection('users').doc(user.id).update(user);+
    */
  }





}
