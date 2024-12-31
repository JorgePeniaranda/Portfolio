import type {Project, Stack} from "@prisma/client";

import {databaseClient} from "../../helpers/client/prisma";

export async function getAllStackWithProjectsMin(): Promise<
  Array<
    Stack & {
      projects: Pick<Project, "id" | "key" | "name" | "logoUrl">[];
    }
  >
> {
  return await databaseClient.stack.findMany({
    include: {
      projects: {
        select: {
          id: true,
          key: true,
          name: true,
          logoUrl: true,
        },
      },
    },
  });
}
