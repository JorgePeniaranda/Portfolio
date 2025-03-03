import type { APIRoute, GetStaticPaths } from 'astro';

import { z } from 'zod';

import { databaseClient } from '@/helpers/client/prisma';
import { handleApiError } from '@/helpers/error/api-handler';

/**
 * POST handler to add a collaborator to a project.
 * - Parses and validates the params.
 * - Connects the specified collaborator to the project in the database.
 * @param params Function parameters
 * @param params.params The request parameters
 * @param params.url The request URL
 * @returns A null response
 */
export const POST: APIRoute = async ({ params, url }) => {
  try {
    const idFrom = z.coerce.number().parse(params.id);
    const idTo = z.coerce.number().parse(params.idCollaborator);

    await databaseClient.project.update({
      data: {
        associatedCollaborators: {
          connect: {
            id: idTo,
          },
        },
      },
      where: { id: idFrom },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    return handleApiError(error, url);
  }
};

/**
 * DELETE handler to remove a collaborator from a project.
 * - Parses and validates the params.
 * - Disconnects the specified collaborator from the project in the database.
 * @param params Function parameters
 * @param params.params The request parameters
 * @param params.url The request URL
 * @returns A null response
 */
export const DELETE: APIRoute = async ({ params, url }) => {
  try {
    const idFrom = z.coerce.number().parse(params.id);
    const idTo = z.coerce.number().parse(params.idCollaborator);

    await databaseClient.project.update({
      data: {
        associatedCollaborators: {
          disconnect: {
            id: idTo,
          },
        },
      },
      where: { id: idFrom },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    return handleApiError(error, url);
  }
};

export const getStaticPaths = (async () => {
  const projects = await databaseClient.project.findMany({
    select: {
      id: true,
    },
  });

  const collaborators = await databaseClient.collaborator.findMany({
    select: {
      id: true,
    },
  });

  return projects.flatMap((project) =>
    collaborators.map((collaborator) => ({
      params: {
        id: project.id,
        idCollaborator: collaborator.id,
      },
    })),
  );
}) satisfies GetStaticPaths;
