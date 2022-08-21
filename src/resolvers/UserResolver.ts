import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { User } from '../models/User';
import { UserRepository } from '../repositories/userRepository/UserRepository';
import { encryptPassword } from '../utils/helpers';

@Resolver()
export class UserResolver {
  @Query((returns) => String)
  async hello() {
    return 'Hello';
  }

  @Mutation((returns) => User)
  async createUser(
    @Arg('name') name: string,
    @Arg('email') email: string,
    @Arg('initials') initials: string,
    @Arg('password') password: string,
    @Arg('confirmPassword') confirmPassword: string
  ) {
    const encryptedPassword = encryptPassword(password);

    const userRepository = new UserRepository();

    const user = await userRepository.create({
      name,
      email,
      initials,
      password: encryptedPassword,
    });

    return user;
  }
}
