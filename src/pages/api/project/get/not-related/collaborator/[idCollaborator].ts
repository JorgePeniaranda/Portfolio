import type {APIRoute, GetStaticPaths} from "astro";

import {z} from "zod";

import {databaseClient} from "@/helpers/client/prisma";
import {BuildPaginationByURL} from "@/helpers/common/build-pagination";
import {RequestHandler} from "@/helpers/common/request-handler";
import {fromPaginationRequestToPrismaPagination} from "@/mappers/common/fromPaginationRequestToPrismaPagination";
import {getAllCollaborator} from "@/services/collaborator/getAllCollaborator";

/**
 * GET handler to fetch a paginated list of projects.
 * - Pagination is optional. If provided, it must be a positive numeric value greater than 0.
 */
export const GET: APIRoute = ({request, params}) => {
  return RequestHandler(
    async () => {
      const idCollaborator = z.coerce.number().parse(params.idCollaborator);
      const paginationParams = BuildPaginationByURL(request.url);

      const response = await databaseClient.project.findMany({
        where: {
          associatedCollaborators: {
            none: {
              id: idCollaborator,
            },
          },
        },
        ...fromPaginationRequestToPrismaPagination(paginationParams),
      });

      return {
        success: true,
        message: "Projects fetched successfully",
        data: response,
      };
    },
    {successStatusCode: 200},
  );
};

export const getStaticPaths = (async () => {
  const collaborator = await getAllCollaborator();

  return collaborator.map((collaborator) => ({
    params: {key: collaborator.id},
    props: collaborator,
  }));
}) satisfies GetStaticPaths;
