import { Arg, Args, Mutation, Query, Resolver } from 'type-graphql';
import { User } from '../models/User';
import { UserPayload } from '../models/UserPayload';
import { UserRepository } from '../repositories/userRepository/UserRepository';

import { encryptPassword } from '../utils/helpers';
import { CreateUserArgs } from './args/CreateUserArgs';
import { UpdateUserArgs } from './args/UpdateUserArgs';

const userRepository = new UserRepository();

@Resolver()
export class UserResolver {
  @Query((returns) => UserPayload)
  async authenticateUser(
    @Arg('email') email: string,
    @Arg('password') password: string
  ) {
    if (!email || !password) {
      throw new Error('Enter E-mail and password!');
    }
  }

  @Mutation((returns) => User)
  async createUser(@Args() createUserArgs: CreateUserArgs) {
    const { name, email, initials, password, confirmPassword } = createUserArgs;

    const encryptedPassword = encryptPassword(password);

    const user = await userRepository.create({
      name,
      email,
      initials,
      password: encryptedPassword,
    });

    return user;
  }

  @Mutation((returns) => User)
  async updateUser(@Args() updateUserArgs: UpdateUserArgs) {
    const { userId, initials, name } = updateUserArgs;

    const user = await userRepository.update(userId, name, initials);

    return user;
  }

  @Mutation((returns) => User)
  async deleteUser(@Arg('userId') userId: string) {
    const user = await userRepository.remove(userId);

    return user;
  }
}
