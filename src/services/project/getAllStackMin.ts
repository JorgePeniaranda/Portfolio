import type {Project} from "@prisma/client";

import {prisma} from "../../helpers/client/prisma-client";

export async function getAllProjectMin(): Promise<
  Pick<Project, "id" | "key" | "name" | "logoUrl" | "primaryColor">[]
> {
  return await prisma.project.findMany({
    select: {
      id: true,
      key: true,
      name: true,
      logoUrl: true,
      primaryColor: true,
    },
  });
}
