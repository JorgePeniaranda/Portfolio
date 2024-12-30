import type {APIRoute} from "astro";

import {databaseClient} from "../../../../helpers/client/prisma";
import {RequestHandler} from "../../../../helpers/common/request-handler";
import {CollaboratorUpdateSchema} from "../../../../schemas/collaborator/update";

// Disable prerendering for this route
export const prerender = false;

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

      const response = await databaseClient.colaborator.update({
        data: {
          nickname: validationResult.nickname,
          githubUsername: validationResult.githubUsername,
          linkedinUsername: validationResult.linkedinUsername,
        },
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
