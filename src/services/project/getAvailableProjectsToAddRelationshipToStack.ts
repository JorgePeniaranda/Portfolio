import type {Project, Stack} from "@prisma/client";

import {databaseClient} from "../../helpers/client/prisma";

export async function getAvailableProjectsToAddRelationshipToStack({
  idStack,
}: {
  idStack: Stack["id"];
}): Promise<Pick<Project, "id" | "name" | "logoUrl">[]> {
  return await databaseClient.project.findMany({
    where: {
      techStacks: {
        none: {
          id: idStack,
        },
      },
    },
    select: {
      id: true,
      name: true,
      logoUrl: true,
    },
  });
}
