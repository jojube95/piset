import { Component, OnInit } from '@angular/core';
import {Invitation} from '../../../model/invitation';
import {InvitationStorageService} from '../../../services/invitation-storage.service';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {UserStorageService} from '../../../services/user-storage.service';

@Component({
  selector: 'app-user-invitations',
  templateUrl: './user-invitations.component.html',
  styleUrls: ['./user-invitations.component.scss'],
})
export class UserInvitationsComponent implements OnInit {
  loading = true;
  form: FormGroup;

  constructor(private invitationStorage: InvitationStorageService, private userStorage: UserStorageService, private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")
      ]]
    })

    this.loading = false;
  }

  acceptInvitation(invitation: Invitation){
    this.invitationStorage.acceptInvitation(invitation);
  }

  declineInvitation(invitation: Invitation){
    this.invitationStorage.declineInvitation(invitation);
  }

  invite(){
    if(this.form.valid){
      //Check userMail exist
      this.userStorage.getUserByMail(this.form.value.email).subscribe(res => {

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

}
