export interface Map {
  [key: string]: string;
}

export interface ITask {
  id?: number;
  username?: string;
  email?: string;
  text?: string;
  status?: number;
}

export interface ITasks {
  tasks?: Array<ITask> | [];
  total_task_count?: string;
}

