import { Field, ObjectType } from 'type-graphql';
import { Task } from './Task';
import { PaginatedTasks as PaginatedTasksInterface } from '../repositories/taskRepository/ITaskRepository';

@ObjectType()
export class PaginatedTasks implements PaginatedTasksInterface {
  @Field((type) => [Task])
  tasks: Task[];

  @Field()
  count: number;

  @Field()
  limit: number;
}
