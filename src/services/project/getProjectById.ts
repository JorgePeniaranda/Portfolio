import type {Project} from "@prisma/client";

import {databaseClient} from "@/helpers/client/prisma";

export async function getProjectById({id}: {id: Project["id"]}): Promise<Project | null> {
  const data = await databaseClient.project.findUnique({
    where: {
      id,
    },
  });

  return data;
}
