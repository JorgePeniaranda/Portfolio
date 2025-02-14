import type { APIRoute, GetStaticPaths } from 'astro';

import { z } from 'zod';

import { databaseClient } from '@/helpers/client/prisma';
import { handleApiError } from '@/helpers/error/api-handler';

/**
 * GET handler to fetch a paginated list of projects.
 */
export const GET: APIRoute = async ({ params, url }) => {
  try {
    const idCollaborator = z.coerce.number().parse(params.idCollaborator);

    const relatedProjects = await databaseClient.project.findMany({
      where: {
        associatedCollaborators: {
          some: {
            id: idCollaborator,
          },
        },
      },
    });

    return Response.json(relatedProjects, { status: 200 });
  } catch (error) {
    return handleApiError(error, url);
  }
};

export const getStaticPaths = (async () => {
  const collaborators = await databaseClient.collaborator.findMany({
    select: {
      id: true,
    },
  });

  return collaborators.map((collaborator) => ({
    params: { idCollaborator: collaborator.id },
  }));
}) satisfies GetStaticPaths;
