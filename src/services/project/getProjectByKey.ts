import type {Project} from "@prisma/client";

import {databaseClient} from "@/helpers/client/prisma";

export async function getProjectById({key}: {key: Project["key"]}): Promise<Project | null> {
  return await databaseClient.project.findUnique({
    where: {
      key,
    },
  });
}
