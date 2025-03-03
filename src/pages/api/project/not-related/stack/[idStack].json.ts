import type { APIRoute, GetStaticPaths } from 'astro';

import { z } from 'zod';

import { databaseClient } from '@/helpers/client/prisma';
import { handleApiError } from '@/helpers/error/api-handler';

/**
 * GET handler to fetch a paginated list of projects.
 * @param params Function parameters
 * @param params.params The request parameters
 * @param params.url The request URL
 * @returns A list of projects
 */
export const GET: APIRoute = async ({ params, url }) => {
  try {
    const idStack = z.coerce.number().parse(params.idStack);

    const unrelatedProjects = await databaseClient.project.findMany({
      where: {
        associatedStacks: {
          none: {
            id: idStack,
          },
        },
      },
    });

    return Response.json(unrelatedProjects, { status: 200 });
  } catch (error) {
    return handleApiError(error, url);
  }
};

export const getStaticPaths = (async () => {
  const stacks = await databaseClient.stack.findMany({
    select: {
      id: true,
    },
  });

  return stacks.map((stack) => ({
    params: { idStack: stack.id },
  }));
}) satisfies GetStaticPaths;
