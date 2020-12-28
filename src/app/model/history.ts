export class History{
    _id: string;
    subtaskId: string;
    subtaskName: string;
    subtaskPenalty: number;
    subtaskDone: boolean;
    userId: string;
<<<<<<< HEAD
    dateIni: Date;
    dateFin: Date;

    constructor(subtaskId: string, subtaskName: string, subtaskPenalty: number, subtaskDone: boolean, userId: string, dateIni: Date, dateFin: Date, _id?: string){
=======
    userName: string;
    groupId: string;
    groupName: string
    dateIni: Date;
    dateFin: Date;

    constructor(subtaskId: string, subtaskName: string, subtaskPenalty: number, subtaskDone: boolean, userId: string, userName: string,
                dateIni: Date, dateFin: Date, _id?: string, groupId?: string, groupName?: string){
>>>>>>> dev
        this.subtaskId = subtaskId;
        this.subtaskName = subtaskName;
        this.subtaskPenalty = subtaskPenalty;
        this.subtaskDone = subtaskDone;
        this.userId = userId;
<<<<<<< HEAD
        this.dateIni = dateIni;
        this.dateFin = dateFin;
        this._id = _id || null;
=======
        this.userName = userName;
        this.dateIni = dateIni;
        this.dateFin = dateFin;
        this._id = _id || null;
        this.groupId = groupId || null;
        this.groupName = groupId || null;
>>>>>>> dev
    }
}
