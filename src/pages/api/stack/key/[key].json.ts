import type { APIRoute, GetStaticPaths } from 'astro';

import { z } from 'zod';

import { databaseClient } from '@/helpers/client/prisma';
import { handleApiError } from '@/helpers/error/api-handler';

/**
 * GET handler to fetch a stack.
 * @param params Function parameters
 * @param params.params The request parameters
 * @param params.url The request URL
 * @returns A stack
 */
export const GET: APIRoute = async ({ params, url }) => {
  try {
    const key = z.coerce.string().parse(params.key);

    const fetchedStack = await databaseClient.stack.findUnique({
      where: {
        key,
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
      key: true,
    },
  });

  return stacks.map((stack) => ({
    params: { key: stack.key },
  }));
}) satisfies GetStaticPaths;
