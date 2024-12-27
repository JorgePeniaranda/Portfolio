import type {Project} from "@prisma/client";

import {prisma} from "../../helpers/client/prisma-client";

export async function getAllProjects(): Promise<Project[]> {
  return await prisma.project.findMany();
}
