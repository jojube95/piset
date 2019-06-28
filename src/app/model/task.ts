import { SubTask } from './subTask';

export class Task{
    name: string;
    subtasks: SubTask[];
    id: string;
    groupId: string;
    userId: string;

    constructor(name: string, subtasks?: SubTask[], id?: string){
      this.name = name;
      this.subtasks = subtasks || null;
      this.id = id || null;
    }


}
