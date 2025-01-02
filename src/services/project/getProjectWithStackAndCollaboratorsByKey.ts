import type {Collaborator, Project, Stack} from "@prisma/client";

import {databaseClient} from "@/helpers/client/prisma";

export async function getProjectWithStackAndCollaboratorsByKey({
  key,
}: {
  key: Project["key"];
}): Promise<
  | (Project & {
      associatedStacks: Array<Stack>;
      associatedCollaborators: Array<Collaborator>;
    })
  | null
> {
  return await databaseClient.project.findUnique({
    where: {
      key,
    },
    include: {
      associatedStacks: true,
      associatedCollaborators: true,
    },
  });
}
