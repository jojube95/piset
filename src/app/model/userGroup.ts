import {Group} from './group';

export class UserGroup {
    group: Group;
    groupAdmin: boolean;

    constructor(group: Group, groupAdmin: boolean) {
        this.group = group;
        this.groupAdmin = groupAdmin;
    }
}
