export class History{
    _id: string;
    taskId: string;
    taskName: string;
    userId: string;
    userName: string;
    groupId: string;
    groupName: string
    dateIni: Date;
    dateFin: Date;

    constructor(taskId: string, taskName: string, userId: string, userName: string,
                dateIni: Date, dateFin: Date, _id?: string, groupId?: string, groupName?: string){
        this.taskId = taskId;
        this.taskName = taskName;
        this.userId = userId;
        this.userName = userName;
        this.dateIni = dateIni;
        this.dateFin = dateFin;
        this._id = _id || null;
        this.groupId = groupId || null;
        this.groupName = groupId || null;
    }
}
