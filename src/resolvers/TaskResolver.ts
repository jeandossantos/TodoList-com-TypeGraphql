import { Arg, Query, Resolver } from 'type-graphql';
import { PaginatedTasks } from '../models/PaginatedTasks';
import { Task } from '../models/Task';
import { TaskRepository } from '../repositories/taskRepository/TaskRepository';
import { existsOrError } from '../utils/validators';

const taskRepository = new TaskRepository();

@Resolver()
export class TaskResolver {
  @Query((returns) => PaginatedTasks)
  async getTasks(
    @Arg('user_id') user_id: string,
    @Arg('page') page?: number,
    @Arg('search') search: string = ''
  ) {
    existsOrError(user_id, 'User ID is required!');

    const tasks = await taskRepository.findByName(user_id, page, search);

    return tasks;
  }
}
