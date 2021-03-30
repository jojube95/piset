export class Group {
    _id: string;
    name: string;
    description: string;
    completePoints: number;

    constructor(_id: string, name: string, description: string, completePoints: number){
        this._id = _id;
        this.name = name;
        this.description = description;
        this.completePoints = completePoints;
    }
}
