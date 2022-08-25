import { MaxLength, MinLength } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class UpdateUserArgs {
  @Field()
  userId: string;

  @Field()
  @MinLength(2, {
    message: 'Nome deve ter pelos menos 2 caracteres.',
  })
  name: string;

  @Field()
  @MinLength(2, {
    message: 'Iniciais deve conter 2 caracteres.',
  })
  @MaxLength(2)
  initials: string;
}
