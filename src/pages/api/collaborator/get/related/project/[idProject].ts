import type {APIRoute} from "astro";

import {z} from "zod";

import {databaseClient} from "@/helpers/client/prisma";
import {BuildPaginationByURL} from "@/helpers/common/build-pagination";
import {RequestHandler} from "@/helpers/common/request-handler";
import {fromPaginationRequestToPrismaPagination} from "@/mappers/common/fromPaginationRequestToPrismaPagination";

/**
 * GET handler to fetch a paginated list of collaborators-min.
 * - Pagination is optional. If provided, it must be a positive numeric value greater than 0.
 */
export const GET: APIRoute = ({request, params}) => {
  return RequestHandler(
    async () => {
      const idProject = z.coerce.number().parse(params.idProject);
      const paginationParams = BuildPaginationByURL(request.url);

      const response = await databaseClient.collaborator.findMany({
        where: {
          associatedProjects: {
            some: {
              id: idProject,
            },
          },
        },
        select: {
          id: true,
          nickname: true,
          githubUsername: true,
        },
        ...fromPaginationRequestToPrismaPagination(paginationParams),
      });

      return {
        success: true,
        message: "Collaborators fetched successfully",
        data: response,
      };
    },
    {successStatusCode: 200},
  );
};
