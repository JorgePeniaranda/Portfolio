import type {Project, Stack} from "@prisma/client";

import {databaseClient} from "../../helpers/client/prisma";

export async function getStackWithProjectsMinById({id}: {id: Stack["id"]}): Promise<
  | (Stack & {
      associatedProjects: Pick<Project, "id" | "key" | "name" | "logoUrl">[];
    })
  | null
> {
  return await databaseClient.stack.findUnique({
    where: {
      id,
    },
    include: {
      associatedProjects: {
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
