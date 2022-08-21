import { prisma } from '../../prisma';

import { User } from '../../models/User';
import { IUserRepository } from './IUserRepository';

export class UserRepository implements IUserRepository {
  async create({
    name,
    email,
    initials,
    password,
  }: Omit<User, 'id' | 'createdAt'>) {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        initials,
        password,
      },
    });

    return user;
  }

  async remove(userId: string) {
    const user = await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return user;
  }

  async update(userId: string, name: string, initials: string) {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        initials,
      },
    });
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async exists(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return !!user;
  }

  async findById(userId: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  }
}
