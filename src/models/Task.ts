import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Task {
  @Field((type) => ID)
  id: string;

  @Field()
  userId: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  deadline?: Date;

  @Field()
  done?: boolean;

  @Field()
  createdAt: Date;
}
