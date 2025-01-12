import type {APIRoute} from "astro";

import {databaseClient} from "@/helpers/client/prisma";
import {handleApiError} from "@/helpers/error/api-handler";
import {CollaboratorUpdateSchema} from "@/schemas/collaborator/update";

/**
 * PUT handler to update an existing collaborator.
 * - Parses the request body.
 * - Validates it using the `CollaboratorUpdateSchema`.
 * - Updates the collaborator in the database.
 */
export const PUT: APIRoute = async ({request}) => {
  try {
    const body = await request.json();
    const validationResult = CollaboratorUpdateSchema.parse(body);

    const updatedCollaborator = await databaseClient.collaborator.update({
      data: validationResult,
      where: {id: validationResult.id},
    });

    return Response.json(updatedCollaborator, {status: 200});
  } catch (error) {
    return handleApiError(error);
  }
};
