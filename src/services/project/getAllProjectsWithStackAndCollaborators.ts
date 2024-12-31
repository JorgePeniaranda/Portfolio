import type {Collaborator, Project, Stack} from "@prisma/client";

import {databaseClient} from "../../helpers/client/prisma";

export async function getAllProjectsWithStackAndCollaborators(): Promise<
  Array<
    Project & {
      associatedStacks: Array<Stack>;
      associatedCollaborators: Array<Collaborator>;
    }
  >
> {
  return await databaseClient.project.findMany({
    include: {
      associatedStacks: true,
      associatedCollaborators: true,
    },
  });
}
