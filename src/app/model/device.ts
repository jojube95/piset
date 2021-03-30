export class Group {
    _id: string;
    deviceId: string;
    userId: string;

    constructor(_id: string, deviceId: string, userId: string){
        this._id = _id;
        this.deviceId = deviceId;
        this.userId = userId;
    }
}
