import { MinLength } from 'class-validator';
import { ArgsType, Field, InputType } from 'type-graphql';

@InputType()
export class CreateTaskInput {
  @Field()
  userId: string;

  @Field()
  @MinLength(2)
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  deadline?: Date;

  @Field({ defaultValue: false, nullable: true })
  done?: boolean;
}
