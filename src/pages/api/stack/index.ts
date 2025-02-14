import type { APIRoute } from 'astro';

import { z } from 'zod';

import { databaseClient } from '@/helpers/client/prisma';
import { handleApiError } from '@/helpers/error/api-handler';
import { StackCreateSchema } from '@/schemas/stack/create';

/**
 * POST handler to create a new stack.
 * - Parses the request body.
 * - Validates it using the `StackCreateSchema`.
 * - Creates a new stack in the database.
 */
export const POST: APIRoute = async ({ request, url }) => {
  try {
    const body = await request.json();
    const validationResult = StackCreateSchema.parse(body);

    const createdStack = await databaseClient.stack.create({
      data: validationResult,
    });

    return Response.json(createdStack, { status: 201 });
  } catch (error) {
    return handleApiError(error, url);
  }
};

/**
 * DELETE handler to remove multiple stacks.
 * - Parses the request body.
 * - Validates it as an array of numbers (IDs).
 * - Deletes stacks from the database.
 */
export const DELETE: APIRoute = async ({ request, url }) => {
  try {
    const body = await request.json();
    const validationResult = z.array(z.number()).parse(body);

    const deletedItemsCount = await databaseClient.stack.deleteMany({
      where: { id: { in: validationResult } },
    });

    return Response.json(deletedItemsCount, { status: 200 });
  } catch (error) {
    return handleApiError(error, url);
  }
};
