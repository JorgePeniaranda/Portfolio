import type {APIRoute} from "astro";

import {databaseClient} from "@/helpers/client/prisma";
import {BuildPaginationByURL} from "@/helpers/common/build-pagination";
import {handleApiError} from "@/helpers/error/api-handler";
import {fromPaginationRequestToPrismaPagination} from "@/mappers/common/fromPaginationRequestToPrismaPagination";

/**
 * GET handler to fetch a paginated list of stacks.
 * - Pagination is optional. If provided, it must be a positive numeric value greater than 0.
 */
export const GET: APIRoute = async ({request, url}) => {
  try {
    const paginationParams = BuildPaginationByURL(request.url);

    const fetchedStacks = await databaseClient.stack.findMany({
      ...fromPaginationRequestToPrismaPagination(paginationParams),
    });

    return Response.json(fetchedStacks, {status: 200});
  } catch (error) {
    return handleApiError(error, url);
  }
};
