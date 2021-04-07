export class State {
    _id: string;
    name: string;

    constructor(name: string, _id?: string){
        this.name = name;
        this._id = _id || null;
    }
}
