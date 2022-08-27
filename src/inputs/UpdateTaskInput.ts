import { MinLength } from 'class-validator';
import { ArgsType, Field, ID, InputType } from 'type-graphql';

@InputType()
export class UpdateTaskInput {
  @Field((type) => ID)
  id: string;

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
