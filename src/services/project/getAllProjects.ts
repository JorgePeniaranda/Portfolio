import type {Project} from "@prisma/client";

import {databaseClient} from "@/helpers/client/prisma";

export async function getAllProjects(): Promise<Project[]> {
  return await databaseClient.project.findMany();
}
