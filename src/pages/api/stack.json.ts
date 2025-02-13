import type { APIRoute } from 'astro';

import { databaseClient } from '@/helpers/client/prisma';
import { handleApiError } from '@/helpers/error/api-handler';

/**
 * GET handler to fetch a paginated list of stacks.
 * - Pagination is optional. If provided, it must be a positive numeric value greater than 0.
 */
export const GET: APIRoute = async ({ url }) => {
  try {
    const fetchedStacks = await databaseClient.stack.findMany({});

    return Response.json(fetchedStacks, { status: 200 });
  } catch (error) {
    return handleApiError(error, url);
  }
};
