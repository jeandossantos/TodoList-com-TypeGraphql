import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class CreateUserArgs {
  @Field()
  @MinLength(2, {
    message: 'Nome deve ter pelos menos 2 caracteres.',
  })
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(2, {
    message: 'Iniciais deve conter 2 caracteres.',
  })
  @MaxLength(2)
  initials: string;

  @Field()
  @MinLength(4, {
    message: 'Senha deve conter pelos menos 4 caracteres.',
  })
  password: string;

  @Field()
  @MinLength(4, {
    message: 'Senhas devem coincidirem.',
  })
  confirmPassword: string;
}
