import type {Project} from "@prisma/client";

import {prisma} from "../../helpers/client/prisma-client";

export async function getAllProjectMin(): Promise<Pick<Project, "id" | "key" | "name">[]> {
  return await prisma.project.findMany({
    select: {
      id: true,
      key: true,
      name: true,
    },
  });
}
