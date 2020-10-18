export class SubTask{
  _id: string;
  name: string;
  description: string;
  penalty: number;
  taskId: string;
  userId: string;
  groupId: string;

  constructor(name: string, description: string, penalty: number, _id?: string, taskId?: string, groupId?: string, userId?: string){
    this.name = name;
    this.description = description;
    this.penalty = penalty;
    this._id = _id || null;
    this.taskId = taskId || null;
    this.groupId = groupId || null;
    this.userId = userId || null;
  }
}
