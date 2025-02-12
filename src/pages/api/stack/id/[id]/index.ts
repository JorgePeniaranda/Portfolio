import type { APIRoute, GetStaticPaths } from 'astro';

import { z } from 'zod';

import { databaseClient } from '@/helpers/client/prisma';
import { handleApiError } from '@/helpers/error/api-handler';
import { StackUpdateSchema } from '@/schemas/stack/update';

/**
 * PUT handler to update an existing stack.
 * - Parses the request body.
 * - Validates it using the `StackUpdateSchema`.
 * - Updates the stack in the database.
 */
export const PUT: APIRoute = async ({ request, params, url }) => {
  try {
    const id = z.coerce.number().parse(params.id);
    const body = await request.json();

    const validationResult = StackUpdateSchema.parse(body);

    const updatedStack = await databaseClient.stack.update({
      data: validationResult,
      where: { id },
    });

    return Response.json(updatedStack, { status: 200 });
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
