import type {Collaborator, Project} from "@prisma/client";

import {databaseClient} from "../../helpers/client/prisma";

export async function getAllCollaboratorWithProjectsMin(): Promise<
  Array<
    Collaborator & {
      project: Pick<Project, "id" | "name" | "logoUrl">[];
    }
  >
> {
  return await databaseClient.collaborator.findMany({
    include: {
      project: {
        select: {
          id: true,
          name: true,
          logoUrl: true,
        },
      },
    },
  });
}
