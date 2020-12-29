export class SubTask{
  _id: string;
  name: string;
  description: string;
  penalty: number;
  taskId: string;
  userId: string;
  done: boolean;
  groupId: string;

  constructor(name: string, description: string, penalty: number, done: boolean, _id?: string, taskId?: string, groupId?: string, userId?: string){
    this.name = name;
    this.description = description;
    this.penalty = penalty;
    this.done = done;
    this._id = _id || null;
    this.taskId = taskId || null;
    this.groupId = groupId || null;
    this.userId = userId || null;
  }
}
