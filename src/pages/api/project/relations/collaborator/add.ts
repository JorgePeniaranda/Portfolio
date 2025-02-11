import type {APIRoute} from "astro";

import {databaseClient} from "@/helpers/client/prisma";
import {handleApiError} from "@/helpers/error/api-handler";
import {RelationshipsSchema} from "@/schemas/common/relationships";

/**
 * PATCH handler to add a collaborator to a project.
 * - Parses and validates the request body.
 * - Connects the specified collaborator to the project in the database.
 */
export const PATCH: APIRoute = async ({request}) => {
  try {
    const body = await request.json();
    const validationResult = RelationshipsSchema.parse(body);

    await databaseClient.project.update({
      data: {
        associatedCollaborators: {
          connect: {
            id: validationResult.idTo,
          },
        },
      },
      where: {id: validationResult.idFrom},
    });

    return new Response(null, {status: 204});
  } catch (error) {
    return handleApiError(error);
  }
};
