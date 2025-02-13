import type { APIRoute } from 'astro';

import { databaseClient } from '@/helpers/client/prisma';
import { handleApiError } from '@/helpers/error/api-handler';

/**
 * GET handler to fetch a paginated list of projects.
 */
export const GET: APIRoute = async ({ url }) => {
  try {
    const fetchedProjects = await databaseClient.project.findMany();

    return Response.json(fetchedProjects, { status: 200 });
  } catch (error) {
    return handleApiError(error, url);
  }
};
