import { SubTask } from './subTask';

export class Task{
  _id: string;
  name: string;
  subtasks: SubTask[];
  groupId: string;
  userId: string;
  userName: string;

  constructor(name: string, subtasks?: SubTask[], _id?: string){
    this.name = name;
    this.subtasks = subtasks || null;
    this._id = _id || null;
  }
}
