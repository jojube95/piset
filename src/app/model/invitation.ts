export class Invitation {
    _id: string;
    userId: string;
    groupId: string;

    constructor(_id: string, userId: string, groupId: string){
        this._id = _id;
        this.userId = userId;
        this.groupId = groupId;
    }
}
