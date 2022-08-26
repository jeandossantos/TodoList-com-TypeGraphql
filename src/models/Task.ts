import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Task {
  @Field((type) => ID)
  id: string;

  @Field()
  userId: string;
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  deadline: Date;

  @Field()
  done: boolean;

  @Field()
  createdAt: Date;
}
