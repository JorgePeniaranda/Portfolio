import type {Collaborator, Project, Stack} from "@prisma/client";

import {databaseClient} from "../../helpers/client/prisma";

export async function getAllProjectsWithStackAndCollaborators(): Promise<
  Array<
    Project & {
      techStacks: Array<Stack>;
      collaborators: Array<Collaborator>;
    }
  >
> {
  return await databaseClient.project.findMany({
    include: {
      techStacks: true,
      collaborators: true,
    },
  });
}
