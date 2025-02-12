import type { APIRoute, GetStaticPaths } from 'astro';

import { z } from 'zod';

import { databaseClient } from '@/helpers/client/prisma';
import { BuildPaginationByURL } from '@/helpers/common/build-pagination';
import { handleApiError } from '@/helpers/error/api-handler';
import { fromPaginationRequestToPrismaPagination } from '@/mappers/common/fromPaginationRequestToPrismaPagination';

/**
 * GET handler to fetch a paginated list of projects.
 * - Pagination is optional. If provided, it must be a positive numeric value greater than 0.
 */
export const GET: APIRoute = async ({ request, params, url }) => {
  try {
    const idStack = z.coerce.number().parse(params.idStack);
    const paginationParams = BuildPaginationByURL(request.url);

    const unrelatedProjects = await databaseClient.project.findMany({
      where: {
        associatedStacks: {
          none: {
            id: idStack,
          },
        },
      },
      ...fromPaginationRequestToPrismaPagination(paginationParams),
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
