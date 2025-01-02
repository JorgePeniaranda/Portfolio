import type {APIRoute} from "astro";

import {CollaboratorCreateSchema} from "@/schemas/collaborator/create";
import {databaseClient} from "@/helpers/client/prisma";
import {RequestHandler} from "@/helpers/common/request-handler";

/**
 * POST handler to create a new collaborator.
 * - Parses the request body.
 * - Validates it using the `CollaboratorCreateSchema`.
 * - Creates a new collaborator in the database.
 */
export const POST: APIRoute = ({request}) => {
  return RequestHandler(
    async () => {
      const body = await request.json();
      const validationResult = CollaboratorCreateSchema.parse(body);
      const response = await databaseClient.collaborator.create({
        data: validationResult,
      });

      return {
        success: true,
        message: "Collaborator created successfully",
        data: response,
      };
    },
    {successStatusCode: 201},
  );
};
