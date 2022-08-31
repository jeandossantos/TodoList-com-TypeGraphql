import { Arg, Args, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { PaginatedTasks } from '../models/PaginatedTasks';
import { Task } from '../models/Task';
import { TaskRepository } from '../repositories/taskRepository/TaskRepository';
import { existsOrError } from '../utils/validators';
import { CreateTaskInput } from '../inputs/CreateTaskInput';
import { UpdateTaskInput } from '../inputs/UpdateTaskInput';
import { Context } from '../prisma';

const taskRepository = new TaskRepository();

@Resolver()
export class TaskResolver {
  @Query((returns) => PaginatedTasks)
  async getTasks(
    @Arg('user_id') user_id: string,
    @Arg('search') search: string = '',
    @Arg('page') page: number,
    @Ctx() ctx: Context
  ) {
    existsOrError(user_id, 'User ID is required!');

    const tasks = await taskRepository.findByName(user_id, page, search);

    return tasks;
  }

  @Mutation((returns) => Task)
  async createTask(@Arg('data') createTaskInput: CreateTaskInput) {
    const { name, description, deadline, done, userId } = createTaskInput;

    existsOrError(userId, 'User ID is required!');
    existsOrError(name, 'Name is required!');

    const task = await taskRepository.create({
      userId,
      name,
      description,
      deadline,
      done,
    });

    return task;
  }

  @Mutation((returns) => Task)
  async updateTask(@Arg('data') updateTaskInput: UpdateTaskInput) {
    const { id, name, description, deadline, done } = updateTaskInput;

    existsOrError(name, 'Name is required!');

    const task = await taskRepository.update({
      id,
      name,
      description,
      deadline,
      done,
    });

    return task;
  }

  @Mutation((returns) => Task)
  async removeTask(@Arg('taskId') taskId: string) {
    const task = await taskRepository.remove(taskId);

    return task;
  }
}
