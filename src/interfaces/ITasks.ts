export interface ITask {
  id?: number;
  username?: string;
  email?: string;
  text?: string;
  status?: number;
  token?: string;
}

export interface ITasks {
  tasks?: Array<ITask> | [];
  total_task_count?: string;
}

