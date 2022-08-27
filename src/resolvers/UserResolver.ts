import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';

import { UserPayload } from '../models/UserPayload';
import { UserRepository } from '../repositories/userRepository/UserRepository';
import { encryptPassword } from '../utils/helpers';
import { CreateUserInput } from '../inputs/CreateUserInput';
import { UpdateUserInput } from '../inputs/UpdateUserInput';
import { CustomException } from '../exceptions/CustomException';
import { User } from '../models/User';
import { equalsOrError } from '../utils/validators';

const userRepository = new UserRepository();

@Resolver()
export class UserResolver {
  @Query((returns) => UserPayload)
  async authenticateUser(
    @Arg('email') email: string,
    @Arg('password') password: string
  ) {
    if (!email || !password) {
      throw new CustomException('Enter E-mail and password!');
    }

    const user = await userRepository.findByEmail(email);

    if (!user) throw new CustomException('E-mail not registered!');

    const isMatch = compareSync(password, user.password);

    if (!isMatch) throw new CustomException('E-mail and/or password invalid.');

    const payload = {
      id: user.id,
      email: user.email,
      initials: user.initials,
    };

    const token = jwt.sign(payload, process.env.MY_SECRET, {
      subject: user.id,
    });

    return { user, token };
  }

  @Mutation((returns) => User)
  async createUser(@Arg('data') createUserInput: CreateUserInput) {
    const { name, email, initials, password, confirmPassword } =
      createUserInput;

    equalsOrError(password, confirmPassword, 'Senhas não combinam!');

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
  async updateUser(@Arg('data') updateUserInput: UpdateUserInput) {
    const { userId, initials, name } = updateUserInput;

    const user = await userRepository.update(userId, name, initials);

    return user;
  }

  @Mutation((returns) => User)
  async deleteUser(@Arg('userId') userId: string) {
    const user = await userRepository.remove(userId);

    return user;
  }
}
