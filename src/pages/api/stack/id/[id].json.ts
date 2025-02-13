import type { APIRoute, GetStaticPaths } from 'astro';

import { z } from 'zod';

import { databaseClient } from '@/helpers/client/prisma';
import { handleApiError } from '@/helpers/error/api-handler';

/**
 * GET handler to fetch a stack.
 */
export const GET: APIRoute = async ({ params, url }) => {
  try {
    const id = z.coerce.number().parse(params.id);

    const fetchedStack = await databaseClient.stack.findUnique({
      where: {
        id,
      },
    });

    return Response.json(fetchedStack, { status: 200 });
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
    params: { id: stack.id },
  }));
}) satisfies GetStaticPaths;
