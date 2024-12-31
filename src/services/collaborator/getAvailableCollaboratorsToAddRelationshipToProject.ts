import type {Collaborator, Project} from "@prisma/client";

import {databaseClient} from "../../helpers/client/prisma";

export async function getAvailableCollaboratorsToAddRelationshipToProject({
  idProject,
}: {
  idProject: Project["id"];
}): Promise<Pick<Collaborator, "id" | "nickname" | "githubUsername">[]> {
  return await databaseClient.collaborator.findMany({
    where: {
      project: {
        none: {
          id: idProject,
        },
      },
    },
    select: {
      id: true,
      nickname: true,
      githubUsername: true,
    },
  });
}
