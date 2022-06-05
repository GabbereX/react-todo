import { ITask } from './ITasks';

export interface IPostDataAnswer {
  message: ITask | string;
  isLoading: boolean;
  status: string;
}
