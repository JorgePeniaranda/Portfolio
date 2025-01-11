import type {APIRoute} from "astro";

import {databaseClient} from "@/helpers/client/prisma";
import {handleApiError} from "@/helpers/error/api-handler";
import {RelationshipsSchema} from "@/schemas/common/relationships";

/**
 * PATCH handler to remove a relation between a project and a technology stack.
 * - Parses and validates the request body.
 * - Disconnects the specified tech stack from the project in the database.
 */
export const PATCH: APIRoute = async ({request}) => {
  try {
    const body = await request.json();
    const validationResult = RelationshipsSchema.parse(body);

    await databaseClient.project.update({
      data: {
        associatedStacks: {
          disconnect: {
            id: validationResult.idTo,
          },
        },
      },
      where: {id: validationResult.idFrom},
    });

    return Response.json(null, {status: 204});
  } catch (error) {
    return handleApiError(error);
  }
};
