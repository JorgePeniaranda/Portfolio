import type {Colaborator, Project, Stack} from "@prisma/client";

import {prisma} from "../../helpers/client/prisma-client";

export async function getAllProjectsWithStackAndCollaborators(): Promise<
  Array<
    Project & {
      techStacks: Array<Stack>;
      collaborators: Array<Colaborator>;
    }
  >
> {
  return await prisma.project.findMany({
    include: {
      techStacks: true,
      collaborators: true,
    },
  });
}
