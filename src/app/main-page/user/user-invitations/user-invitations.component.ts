import { Component, OnInit } from '@angular/core';
import {Invitation} from '../../../model/invitation';
import {InvitationStorageService} from '../../../services/invitation-storage.service';
import {NgForm} from '@angular/forms';
import {UserStorageService} from '../../../services/user-storage.service';

@Component({
  selector: 'app-user-invitations',
  templateUrl: './user-invitations.component.html',
  styleUrls: ['./user-invitations.component.scss'],
})
export class UserInvitationsComponent implements OnInit {
  loading = true;

  constructor(private invitationStorage: InvitationStorageService, private userStorage: UserStorageService) { }

  ngOnInit() {
    this.loading = false;
  }

  acceptInvitation(invitation: Invitation){
    this.invitationStorage.acceptInvitation(invitation);
  }

  declineInvitation(invitation: Invitation){
    this.invitationStorage.declineInvitation(invitation);
  }

  onInvite(form: NgForm){
    //Check userMail exist
    this.userStorage.getUserByMail(form.value.email).subscribe(res => {

      if(res.users.length != 0){
        let currentUser = this.userStorage.getCurrentUser();
        let invitedUser = res.users[0];
        let currentGroup = this.userStorage.getCurrentGroup();

        let invitation = new Invitation(currentUser.mail, invitedUser._id, currentGroup._id, currentGroup.name);
        this.invitationStorage.inviteUser(invitation);
      }
      else{
        alert("User doesn't exist")
      }
    });




  }

}
