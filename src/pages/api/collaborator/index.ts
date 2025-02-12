import type { APIRoute } from 'astro';

import { z } from 'zod';

import { databaseClient } from '@/helpers/client/prisma';
import { handleApiError } from '@/helpers/error/api-handler';
import { CollaboratorCreateSchema } from '@/schemas/collaborator/create';

/**
 * POST handler to create a new collaborator.
 * - Parses the request body.
 * - Validates it using the `CollaboratorCreateSchema`.
 * - Creates a new collaborator in the database.
 */
export const POST: APIRoute = async ({ request, url }) => {
  try {
    const body = await request.json();
    const validationResult = CollaboratorCreateSchema.parse(body);

    const createdCollaborator = await databaseClient.collaborator.create({
      data: validationResult,
    });

    return Response.json(createdCollaborator, { status: 201 });
  } catch (error) {
    return handleApiError(error, url);
  }
};

/**
 * DELETE handler to remove multiple collaborators.
 * - Parses the request body.
 * - Validates it as an array of numbers (IDs).
 * - Deletes collaborators from the database.
 */
export const DELETE: APIRoute = async ({ request, url }) => {
  try {
    const body = await request.json();
    const validationResult = z.array(z.number()).parse(body);

    const deletedItemsCount = await databaseClient.collaborator.deleteMany({
      where: { id: { in: validationResult } },
    });

    return Response.json(deletedItemsCount, { status: 200 });
  } catch (error) {
    return handleApiError(error, url);
  }
};
