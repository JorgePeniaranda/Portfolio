import type {Project, Stack} from "@prisma/client";

import {isNotDefined} from "../../helpers/guards/is-defined";
import {databaseClient} from "../../helpers/client/prisma";

export async function getProjectsMinByStackId({
  idStack,
}: {
  idStack: Stack["id"];
}): Promise<Pick<Project, "id" | "name" | "key">[]> {
  const data = await databaseClient.stack.findUnique({
    where: {
      id: idStack,
    },
    select: {
      associatedProjects: {
        select: {
          id: true,
          name: true,
          key: true,
        },
      },
    },
  });

  if (isNotDefined(data)) {
    return [];
  }

  return data.associatedProjects;
}
