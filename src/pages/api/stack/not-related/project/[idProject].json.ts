import type { APIRoute, GetStaticPaths } from 'astro';

import { z } from 'zod';

import { databaseClient } from '@/helpers/client/prisma';
import { handleApiError } from '@/helpers/error/api-handler';

/**
 * GET handler to fetch a paginated list of stacks.
 */
export const GET: APIRoute = async ({ params, url }) => {
  try {
    const idProject = z.coerce.number().parse(params.idProject);

    const unrelatedStacks = await databaseClient.stack.findMany({
      where: {
        associatedProjects: {
          none: {
            id: idProject,
          },
        },
      },
    });

    return Response.json(unrelatedStacks, { status: 200 });
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

  return projects.map((project) => ({
    params: { idProject: project.id },
  }));
}) satisfies GetStaticPaths;
