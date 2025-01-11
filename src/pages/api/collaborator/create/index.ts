import type {APIRoute} from "astro";

import {databaseClient} from "@/helpers/client/prisma";
import {handleApiError} from "@/helpers/error/api-handler";
import {CollaboratorCreateSchema} from "@/schemas/collaborator/create";

/**
 * POST handler to create a new collaborator.
 * - Parses the request body.
 * - Validates it using the `CollaboratorCreateSchema`.
 * - Creates a new collaborator in the database.
 */
export const POST: APIRoute = async ({request}) => {
  try {
    const body = await request.json();
    const validationResult = CollaboratorCreateSchema.parse(body);

    const createdCollaborator = await databaseClient.collaborator.create({
      data: validationResult,
    });

    return Response.json(createdCollaborator, {status: 201});
  } catch (error) {
    return handleApiError(error);
  }
};
