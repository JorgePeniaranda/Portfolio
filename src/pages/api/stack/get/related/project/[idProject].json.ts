import type {APIRoute, GetStaticPaths} from "astro";

import {z} from "zod";

import {databaseClient} from "@/helpers/client/prisma";
import {BuildPaginationByURL} from "@/helpers/common/build-pagination";
import {handleApiError} from "@/helpers/error/api-handler";
import {fromPaginationRequestToPrismaPagination} from "@/mappers/common/fromPaginationRequestToPrismaPagination";

/**
 * GET handler to fetch a paginated list of stacks.
 * - Pagination is optional. If provided, it must be a positive numeric value greater than 0.
 */
export const GET: APIRoute = async ({request, params}) => {
  try {
    const idProject = z.coerce.number().parse(params.idProject);
    const paginationParams = BuildPaginationByURL(request.url);

    const relatedStacks = await databaseClient.stack.findMany({
      where: {
        associatedProjects: {
          some: {
            id: idProject,
          },
        },
      },
      ...fromPaginationRequestToPrismaPagination(paginationParams),
    });

    return Response.json(relatedStacks, {status: 200});
  } catch (error) {
    return handleApiError(error);
  }
};

export const getStaticPaths = (async () => {
  const projects = await databaseClient.project.findMany({
    select: {
      id: true,
    },
  });

  return projects.map((project) => ({
    params: {idProject: project.id},
  }));
}) satisfies GetStaticPaths;
