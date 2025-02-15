import type { APIRoute } from 'astro';

import { databaseClient } from '@/helpers/client/prisma';
import { handleApiError } from '@/helpers/error/api-handler';

/**
 * GET handler to fetch a paginated list of collaborators.
 * @param params Function parameters
 * @param params.url The request URL
 * @returns A list of collaborators
 */
export const GET: APIRoute = async ({ url }) => {
  try {
    const fetchedCollaborators = await databaseClient.collaborator.findMany();

    return Response.json(fetchedCollaborators, { status: 200 });
  } catch (error) {
    return handleApiError(error, url);
  }
};
