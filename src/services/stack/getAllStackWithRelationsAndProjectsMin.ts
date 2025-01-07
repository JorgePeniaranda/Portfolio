import type {Project, Stack} from "@prisma/client";

import {databaseClient} from "@/helpers/client/prisma";

// TO-DO: REPLACE WITH API CALL
export async function getAllStackWithRelationsAndProjectsMin(): Promise<
  Array<
    Stack & {
      associatedProjects: Pick<Project, "id" | "key" | "name" | "logoUrl">[];
      relatedFrom: {
        toStackStack: Stack;
      }[];
      relatedTo: {
        fromStackStack: Stack;
      }[];
    }
  >
> {
  return await databaseClient.stack.findMany({
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
