import type {Project, Stack} from "@prisma/client";

import {databaseClient} from "../../helpers/client/prisma";

export async function getAvailableStacksToAddRelationshipToProject({
  idProject,
}: {
  idProject: Project["id"];
}): Promise<Pick<Stack, "id" | "name" | "iconUrl">[]> {
  return await databaseClient.stack.findMany({
    where: {
      associatedProjects: {
        none: {
          id: idProject,
        },
      },
    },
    select: {
      id: true,
      name: true,
      iconUrl: true,
    },
  });
}
