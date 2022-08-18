import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  initials: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  createdAt: Date;
}
