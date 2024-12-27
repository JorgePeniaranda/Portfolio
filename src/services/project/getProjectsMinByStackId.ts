import type {Project, Stack} from "@prisma/client";

import {isNotDefined} from "../../helpers/guards/is-defined";
import {prisma} from "../../helpers/client/prisma-client";

export async function getProjectsMinByStackId({
  idStack,
}: {
  idStack: Stack["id"];
}): Promise<Pick<Project, "id" | "name" | "key">[]> {
  const data = await prisma.stack.findUnique({
    where: {
      id: idStack,
    },
    select: {
      projects: {
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

  return data.projects;
}
