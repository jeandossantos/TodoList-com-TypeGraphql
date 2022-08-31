import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  log: ['error'],
});

export interface Context {
  prisma: PrismaClient;
}

export const context: Context = {
  prisma,
};
