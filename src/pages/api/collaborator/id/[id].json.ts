import type { APIRoute, GetStaticPaths } from 'astro';

import { z } from 'zod';

import { databaseClient } from '@/helpers/client/prisma';
import { handleApiError } from '@/helpers/error/api-handler';

/**
 * GET handler to fetch a collaborator.
 * @param params The request parameters
 * @param params.params The request parameters
 * @param params.url The request URL
 * @returns A collaborator
 */
export const GET: APIRoute = async ({ params, url }) => {
  try {
    const id = z.coerce.number().parse(params.id);

    const fetchedCollaborator = await databaseClient.collaborator.findUnique({
      where: {
        id,
      },
    });

    return Response.json(fetchedCollaborator, { status: 200 });
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
    params: { id: collaborator.id },
  }));
}) satisfies GetStaticPaths;
