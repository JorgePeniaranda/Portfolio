import type {Project} from "@prisma/client";

import {databaseClient} from "../../helpers/client/prisma";

export async function getAllProjectMin(): Promise<
  Pick<Project, "id" | "key" | "name" | "logoUrl" | "primaryColor">[]
> {
  return await databaseClient.project.findMany({
    select: {
      id: true,
      key: true,
      name: true,
      logoUrl: true,
      primaryColor: true,
    },
  });
}
