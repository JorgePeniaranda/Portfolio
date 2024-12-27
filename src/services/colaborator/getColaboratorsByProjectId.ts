import type {Colaborator, Stack} from "@prisma/client";

import {prisma} from "../../helpers/client/prisma-client";
import {isNotDefined} from "../../helpers/guards/is-defined";

export async function getColaboratorsByProjectId({
  id,
}: {
  id: Stack["id"];
}): Promise<Colaborator[] | null> {
  const data = await prisma.project.findUnique({
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
