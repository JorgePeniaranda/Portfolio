import type {Collaborator, Project} from "@prisma/client";

import {databaseClient} from "../../helpers/client/prisma";

export async function getCollaboratorWithProjectsMinById({id}: {id: Collaborator["id"]}): Promise<
  | (Collaborator & {
      associatedProjects: Pick<Project, "id" | "name" | "logoUrl">[];
    })
  | null
> {
  return await databaseClient.collaborator.findUnique({
    where: {
      id,
    },
    include: {
      associatedProjects: {
        select: {
          id: true,
          name: true,
          logoUrl: true,
        },
      },
    },
  });
}
