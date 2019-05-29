export class SubTask{
    name: string;
    description: string;
    penalty: number;
    key: string;

    constructor(name: string, description: string, penalty: number, key?: string){
        this.name = name;
        this.description = description;
        this.penalty = penalty;
        this.key = key || null;;
    }


}
