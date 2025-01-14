import type {APIRoute, GetStaticPaths} from "astro";

import {z} from "zod";

import {databaseClient} from "@/helpers/client/prisma";
import {BuildPaginationByURL} from "@/helpers/common/build-pagination";
import {handleApiError} from "@/helpers/error/api-handler";
import {fromPaginationRequestToPrismaPagination} from "@/mappers/common/fromPaginationRequestToPrismaPagination";

/**
 * GET handler to fetch a paginated list of projects.
 * - Pagination is optional. If provided, it must be a positive numeric value greater than 0.
 */
export const GET: APIRoute = async ({request, params}) => {
  try {
    const idCollaborator = z.coerce.number().parse(params.idCollaborator);
    const paginationParams = BuildPaginationByURL(request.url);

    const relatedProjects = await databaseClient.project.findMany({
      where: {
        associatedCollaborators: {
          some: {
            id: idCollaborator,
          },
        },
      },
      ...fromPaginationRequestToPrismaPagination(paginationParams),
    });

    return Response.json(relatedProjects, {status: 200});
  } catch (error) {
    return handleApiError(error);
  }
};

export const getStaticPaths = (async () => {
  const collaborators = await databaseClient.collaborator.findMany({
    select: {
      id: true,
    },
  });

  return collaborators.map((collaborator) => ({
    params: {idCollaborator: collaborator.id},
  }));
}) satisfies GetStaticPaths;
