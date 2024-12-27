import {PrismaClient} from "@prisma/client";

/**
 * A Prisma client instance.
 *
 * @see https://www.prisma.io/docs/orm/prisma-client
 * @example
 * import {databaseClient} from "./helpers/client/prisma";
 *
 * async function main() {
 *  const allProjects = await databaseClient.project.findMany();
 *  console.dir(allProjects, {depth: null});
 * }
 */
export const databaseClient = new PrismaClient();
