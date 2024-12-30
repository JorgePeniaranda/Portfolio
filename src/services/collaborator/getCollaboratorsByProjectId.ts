import type {Collaborator, Stack} from "@prisma/client";

import {databaseClient} from "../../helpers/client/prisma";
import {isNotDefined} from "../../helpers/guards/is-defined";

export async function getCollaboratorsByProjectId({
  id,
}: {
  id: Stack["id"];
}): Promise<Collaborator[] | null> {
  const data = await databaseClient.project.findUnique({
    where: {
      id,
    },
    select: {
      collaborators: true,
    },
  });

  if (isNotDefined(data)) {
    return null;
  }

  return data.collaborators;
}
