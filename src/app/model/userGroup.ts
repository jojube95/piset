export class UserGroup {
    groupId: string;
    groupName: string;
    groupAdmin: boolean;

    constructor(groupId: string, groupName: string, groupAdmin: boolean) {
        this.groupId = groupId;
        this.groupName = groupName;
        this.groupAdmin = groupAdmin;
    }
}
