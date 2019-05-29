import { SubTask } from './subTask';

export class Task{
    name: string;
    subtasks: SubTask[];
    key: string;

    constructor(name: string, subtasks?: SubTask[], key?: string){
      this.name = name;
      this.subtasks = subtasks || null;
      this.key = key || null;
    }


}
