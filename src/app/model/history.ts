export class History{
    _id: string;
    subtaskId: string;
    subtaskName: string;
    subtaskPenalty: number;
    subtaskDone: boolean;
    userId: string;
    userName: string;
    groupId: string;
    groupName: string
    dateIni: Date;
    dateFin: Date;

    constructor(subtaskId: string, subtaskName: string, subtaskPenalty: number, subtaskDone: boolean, userId: string, userName: string,
                dateIni: Date, dateFin: Date, _id?: string, groupId?: string, groupName?: string){
        this.subtaskId = subtaskId;
        this.subtaskName = subtaskName;
        this.subtaskPenalty = subtaskPenalty;
        this.subtaskDone = subtaskDone;
        this.userId = userId;
        this.userName = userName;
        this.dateIni = dateIni;
        this.dateFin = dateFin;
        this._id = _id || null;
        this.groupId = groupId || null;
        this.groupName = groupId || null;
    }
}
