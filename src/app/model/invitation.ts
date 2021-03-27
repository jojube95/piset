export class Invitation {
    _id: string;
    groupId: string;
    groupName: string;
    userId: string;
    userName: string;

    constructor(groupId: string, groupName: string, userId: string, userName: string, _id?: string){
        this.groupId = groupId;
        this.groupName = groupName;
        this.userId = userId;
        this.userName = userName;
        this._id = _id || null;
    }
}
