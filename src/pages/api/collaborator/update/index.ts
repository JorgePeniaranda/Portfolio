import type {APIRoute} from "astro";

import {CollaboratorUpdateSchema} from "@/schemas/collaborator/update";
import {databaseClient} from "@/helpers/client/prisma";
import {RequestHandler} from "@/helpers/common/request-handler";

/**
 * PUT handler to update an existing collaborator.
 * - Parses the request body.
 * - Validates it using the `CollaboratorUpdateSchema`.
 * - Updates the collaborator in the database.
 */
export const PUT: APIRoute = ({request}) => {
  return RequestHandler(
    async () => {
      const body = await request.json();
      const validationResult = CollaboratorUpdateSchema.parse(body);

      const response = await databaseClient.collaborator.update({
        data: validationResult,
        where: {id: validationResult.id},
      });

      return {
        success: true,
        message: "Collaborator updated successfully",
        data: response,
      };
    },
    {successStatusCode: 200},
  );
};
