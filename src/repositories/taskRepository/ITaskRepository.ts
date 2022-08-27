import { Task } from '../../models/Task';

export type PaginatedTasks = {
  tasks: Task[];
  count: number;
  limit: number;
};

export default interface ITaskRepository {
  create: (task: Omit<Task, 'id' | 'createdAt'>) => Promise<Task>;
  findByName: (
    userId: string,
    page: number,
    name?: string
  ) => Promise<PaginatedTasks>;
  remove: (taskId: string) => Promise<Task>;
  update: (task: Omit<Task, 'userId' | 'createdAt'>) => Promise<Task>;
}
