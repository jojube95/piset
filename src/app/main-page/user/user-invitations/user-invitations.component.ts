import { Component, OnInit } from '@angular/core';
import {Invitation} from '../../../model/invitation';
import {InvitationStorageService} from '../../../services/invitation-storage.service';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {UserStorageService} from '../../../services/user-storage.service';
import {Group} from '../../../model/group';

@Component({
  selector: 'app-user-invitations',
  templateUrl: './user-invitations.component.html',
  styleUrls: ['./user-invitations.component.scss'],
})
export class UserInvitationsComponent implements OnInit {
  loading = true;
  form: FormGroup;
  selectedGroup: Group;

  constructor(public invitationStorage: InvitationStorageService, private userStorage: UserStorageService, private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern('[^ @]*@[^ @]*')
      ]]
    });

    this.loading = false;
  }

  acceptInvitation(invitation: Invitation){
    this.invitationStorage.acceptInvitation(invitation);
  }

  declineInvitation(invitation: Invitation){
    this.invitationStorage.declineInvitation(invitation);
  }

  invite(){
    if (this.form.valid){
      // Check userMail exist
      this.userStorage.getUserByMail(this.form.value.email).subscribe(res => {

        if (res.users.length !== 0){
          const currentUser = this.userStorage.getCurrentUser();
          const invitedUser = res.users[0];

          const invitation = new Invitation(currentUser.mail, invitedUser._id, this.selectedGroup._id, this.selectedGroup.name);
          this.invitationStorage.inviteUser(invitation);
        }
        else{
          alert('User doesn\'t exist');
        }
      });
    }
  }

}
