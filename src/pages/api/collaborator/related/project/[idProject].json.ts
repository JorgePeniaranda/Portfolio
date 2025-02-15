import type { APIRoute, GetStaticPaths } from 'astro';

import { z } from 'zod';

import { databaseClient } from '@/helpers/client/prisma';
import { handleApiError } from '@/helpers/error/api-handler';

/**
 * GET handler to fetch a paginated list of collaborators.
 * @param params - Function parameters
 * @param params.params - The request parameters
 * @param params.url - The request URL
 * @returns A list of collaborators
 */
export const GET: APIRoute = async ({ params, url }) => {
  try {
    const idProject = z.coerce.number().parse(params.idProject);

    const relatedCollaborators = await databaseClient.collaborator.findMany({
      where: {
        associatedProjects: {
          some: {
            id: idProject,
          },
        },
      },
    });

    return Response.json(relatedCollaborators, { status: 200 });
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
