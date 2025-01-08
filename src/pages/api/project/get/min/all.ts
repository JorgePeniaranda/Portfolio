import type {APIRoute} from "astro";

import {databaseClient} from "@/helpers/client/prisma";
import {BuildPaginationByURL} from "@/helpers/common/build-pagination";
import {RequestHandler} from "@/helpers/common/request-handler";
import {fromPaginationRequestToPrismaPagination} from "@/mappers/common/fromPaginationRequestToPrismaPagination";

/**
 * GET handler to fetch a paginated list of projects.
 * - Pagination is optional. If provided, it must be a positive numeric value greater than 0.
 */
export const GET: APIRoute = ({request}) => {
  return RequestHandler(
    async () => {
      const paginationParams = BuildPaginationByURL(request.url);

      const response = await databaseClient.project.findMany({
        select: {
          id: true,
          key: true,
          name: true,
          logoUrl: true,
          stackCategory: true,
          status: true,
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
