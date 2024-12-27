import type {Colaborator, Stack} from "@prisma/client";

import {databaseClient} from "../../helpers/client/prisma";
import {isNotDefined} from "../../helpers/guards/is-defined";

export async function getColaboratorsByProjectId({
  id,
}: {
  id: Stack["id"];
}): Promise<Colaborator[] | null> {
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
