import type { APIRoute, GetStaticPaths } from 'astro';

import { z } from 'zod';

import { databaseClient } from '@/helpers/client/prisma';
import { BuildPaginationByURL } from '@/helpers/common/build-pagination';
import { handleApiError } from '@/helpers/error/api-handler';
import { fromPaginationRequestToPrismaPagination } from '@/mappers/common/fromPaginationRequestToPrismaPagination';

/**
 * GET handler to fetch a paginated list of collaborators.
 * - Pagination is optional. If provided, it must be a positive numeric value greater than 0.
 */
export const GET: APIRoute = async ({ request, params, url }) => {
  try {
    const idProject = z.coerce.number().parse(params.idProject);
    const paginationParams = BuildPaginationByURL(request.url);

    const unrelatedCollaborators = await databaseClient.collaborator.findMany({
      where: {
        associatedProjects: {
          none: {
            id: idProject,
          },
        },
      },
      ...fromPaginationRequestToPrismaPagination(paginationParams),
    });

    return Response.json(unrelatedCollaborators, { status: 200 });
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
