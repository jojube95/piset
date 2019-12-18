import { SubTask } from './subTask';

export class Task{
    name: string;
    subtasks: SubTask[];
    _id: string;
    groupId: string;
    userId: string;

    constructor(name: string, subtasks?: SubTask[], _id?: string){
      this.name = name;
      this.subtasks = subtasks || null;
      this._id = _id || null;
    }


}
