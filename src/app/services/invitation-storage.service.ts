import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Invitation} from '../model/invitation';
import {List} from 'immutable';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class InvitationStorageService {
  private API_URL = environment.API_URL;
  public _userInvitations: BehaviorSubject<List<Invitation>> = new BehaviorSubject(List([]));

  constructor(private http: HttpClient) {}

  loadInvitations(user: User) {
    return this.http.get<{message: string, invitations: any}>(this.API_URL + '/api/invitations/getByUser' + user._id).subscribe(
        res => {
          const invitations = (res.invitations as Invitation[]).map((invitation: any) =>
              new Invitation(invitation.groupId, invitation.groupName, invitation.userId, invitation.userName, invitation._id));
          this._userInvitations.next(List(invitations));
        },
        err => console.log('Error retrieving Invitations')
    );
  }

  inviteUser(invitation: Invitation){
    this.http.post(this.API_URL + '/api/invitations/invite', {invitation}).subscribe(res => {
      this._userInvitations.next(this._userInvitations.getValue().push(invitation));
    });
  }

  acceptInvitation(acceptedInvitation: Invitation){
    this.http.post(this.API_URL + '/api/invitations/accept', {invitation: acceptedInvitation}).subscribe(res => {
      const invitations: List<Invitation> = this._userInvitations.getValue();
      const index = invitations.findIndex((invitation) => invitation._id === acceptedInvitation._id);
      this._userInvitations.next(invitations.delete(index));
    });
  }

  declineInvitation(declinedInvitation: Invitation){
    this.http.post(this.API_URL + '/api/invitations/decline', {invitation: declinedInvitation}).subscribe(res => {
      const invitations: List<Invitation> = this._userInvitations.getValue();
      const index = invitations.findIndex((invitation) => invitation._id === declinedInvitation._id);
      this._userInvitations.next(invitations.delete(index));
    });
  }
}
