import type { Project, Stack } from '@prisma/client';

import { databaseClient } from '@/helpers/client/prisma';
import { handleServiceError } from '@/helpers/error/service-handler';

// TO-DO: REPLACE WITH API CALL
/**
 * Get all stacks with relations and projects with minimal data.
 * @returns A list of stacks with relations and projects with minimal data
 * @throws An error if the stacks could not be retrieved
 */
export async function getAllStackWithRelationsAndProjectsMin(): Promise<
  (Stack & {
    associatedProjects: Pick<Project, 'id' | 'key' | 'name' | 'logoUrl'>[];
    relatedFrom: {
      toStackStack: Stack;
    }[];
    relatedTo: {
      fromStackStack: Stack;
    }[];
  })[]
> {
  try {
    const response = await databaseClient.stack.findMany({
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

    return response;
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage:
        'services.stack.get-all-stack-with-relations-and-projects-min.operation-failed',
    });
  }
}
