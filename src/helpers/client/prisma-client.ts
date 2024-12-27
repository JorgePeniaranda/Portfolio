import {PrismaClient} from "@prisma/client";

/**
 * A Prisma client instance.
 *
 * @see https://www.prisma.io/docs/orm/prisma-client
 * @example
 * import {prisma} from "./helpers/client/prisma-client";
 *
 * async function main() {
 *  const allProjects = await prisma.project.findMany();
 *  console.dir(allProjects, {depth: null});
 * }
 */
export const prisma = new PrismaClient();
