export class Invitation {
    _id: string;
    userId: string;
    groupId: string;
    groupName: string;

    constructor(userId: string, groupId: string, groupName: string, _id?: string){
        this.userId = userId;
        this.groupId = groupId;
        this.groupName = groupName;
        this._id = _id || null;
    }
}
