import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {AuthService} from "../auth/auth.service";


@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }


  updateUserProfile(user: User) {
    return this.http.post('http://localhost:3000/api/users/update', user).subscribe(response => {
      console.log(response);
    });;
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

}
