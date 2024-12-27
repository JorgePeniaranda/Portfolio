import type {Project} from "@prisma/client";

import {prisma} from "../../helpers/client/prisma-client";

export async function getProjectById({key}: {key: Project["key"]}): Promise<Project | null> {
  return await prisma.project.findUnique({
    where: {
      key,
    },
  });
}
