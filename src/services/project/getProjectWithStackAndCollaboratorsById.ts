import type {Collaborator, Project, Stack} from "@prisma/client";

import {databaseClient} from "../../helpers/client/prisma";

export async function getProjectWithStackAndCollaboratorsById({id}: {id: Project["id"]}): Promise<
  | (Project & {
      associatedStacks: Array<Stack>;
      associatedCollaborators: Array<Collaborator>;
    })
  | null
> {
  return await databaseClient.project.findUnique({
    where: {
      id,
    },
    include: {
      associatedStacks: true,
      associatedCollaborators: true,
    },
  });
}
