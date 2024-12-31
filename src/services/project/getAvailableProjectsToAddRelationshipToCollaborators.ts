import type {Collaborator, Project} from "@prisma/client";

import {databaseClient} from "../../helpers/client/prisma";

export async function getAvailableProjectsToAddRelationshipToCollaborators({
  idStack: idCollaborator,
}: {
  idStack: Collaborator["id"];
}): Promise<Pick<Project, "id" | "name" | "logoUrl">[]> {
  return await databaseClient.project.findMany({
    where: {
      collaborators: {
        none: {
          id: idCollaborator,
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
