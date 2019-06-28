export class SubTask{
    name: string;
    description: string;
    penalty: number;
    id: string;
    taskId: string;
    userId: string;
    groupId: string;

    constructor(name: string, description: string, penalty: number, id?: string, taskId?: string, groupId?: string){
      this.name = name;
      this.description = description;
      this.penalty = penalty;
      this.id = id || null;
      this.taskId = taskId || null;
      this.groupId = groupId || null;
    }


}
