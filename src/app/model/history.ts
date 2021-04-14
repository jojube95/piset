export class History{
    _id: string;
    taskId: string;
    taskName: string;
    userId: string;
    userName: string;
    groupId: string;
    groupName: string
    date: Date;
    action: String;
    time: number;

    constructor(taskId: string, taskName: string, userId: string, userName: string, groupId: string, groupName: string,
                date: Date, action: String, time: number, _id?: string){
        this.taskId = taskId;
        this.taskName = taskName;
        this.userId = userId;
        this.userName = userName;
        this.groupId = groupId;
        this.groupName = groupName;
        this.date = date;
        this.action = action;
        this.time = time;
        this._id = _id || null;
    }
}
