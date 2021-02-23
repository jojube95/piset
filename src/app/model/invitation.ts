export class Invitation {
    _id: string;
    senderMail: string;
    invitedUserId: string;
    invitedGroupId: string;
    invitedGroupName: string;

    constructor(invitedUserId: string, senderMail: string, invitedGroupId: string, invitedGroupName: string, _id?: string){
        this.senderMail = senderMail;
        this.invitedUserId = invitedUserId;
        this.invitedGroupId = invitedGroupId;
        this.invitedGroupName = invitedGroupName;
        this._id = _id || null;
    }
}
