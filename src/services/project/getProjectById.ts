import type {Project} from "@prisma/client";

import {prisma} from "../../helpers/client/prisma-client";

export async function getProjectById({id}: {id: Project["id"]}): Promise<Project | null> {
  const data = await prisma.project.findUnique({
    where: {
      id,
    },
  });

  return data;
}
