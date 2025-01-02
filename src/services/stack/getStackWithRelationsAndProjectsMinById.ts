import type {Project, Stack} from "@prisma/client";

import {databaseClient} from "@/helpers/client/prisma";

export async function getStackWithRelationsAndProjectsMinByKey({key}: {key: Stack["key"]}): Promise<
  | (Stack & {
      associatedProjects: Pick<Project, "id" | "key" | "name" | "logoUrl">[];
      relatedFrom: {
        toStackStack: Stack;
      }[];
      relatedTo: {
        fromStackStack: Stack;
      }[];
    })
  | null
> {
  return await databaseClient.stack.findUnique({
    where: {
      key,
    },
    include: {
      associatedProjects: {
        select: {
          id: true,
          key: true,
          name: true,
          logoUrl: true,
        },
      },
      relatedFrom: {
        include: {
          toStackStack: true, // Obtener los stacks destino relacionados desde `relatedFrom`
        },
      },
      relatedTo: {
        include: {
          fromStackStack: true, // Obtener los stacks origen relacionados desde `relatedTo`
        },
      },
    },
  });
}
