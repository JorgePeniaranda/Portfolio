import { PrismaClient } from '@prisma/client';

/**
 * A Prisma client instance.
 *
 * @see https://www.prisma.io/docs/orm/prisma-client
 */
export const databaseClient = new PrismaClient();
