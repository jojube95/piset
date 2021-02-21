import { Component, OnInit } from '@angular/core';
import {Invitation} from '../../../model/invitation';
import {InvitationStorageService} from '../../../services/invitation-storage.service';

@Component({
  selector: 'app-user-invitations',
  templateUrl: './user-invitations.component.html',
  styleUrls: ['./user-invitations.component.scss'],
})
export class UserInvitationsComponent implements OnInit {
  loading = true;

  constructor(private invitationStorage: InvitationStorageService) { }

  ngOnInit() {
    this.loading = false;
  }

  acceptInvitation(invitation: Invitation){
    this.invitationStorage.acceptInvitation(invitation);
  }

  declineInvitation(invitation: Invitation){
    this.invitationStorage.declineInvitation(invitation);
  }

}
