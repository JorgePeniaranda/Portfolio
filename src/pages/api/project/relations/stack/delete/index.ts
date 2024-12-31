import type {APIRoute} from "astro";

import {databaseClient} from "../../../../../../helpers/client/prisma";
import {RequestHandler} from "../../../../../../helpers/common/request-handler";
import {RelationshipsSchema} from "../../../../../../schemas/common/relationships";

// Disable prerendering for this route
export const prerender = false;

/**
 * PATCH handler to remove a relation between a project and a technology stack.
 * - Parses and validates the request body.
 * - Disconnects the specified tech stack from the project in the database.
 */
export const PATCH: APIRoute = ({request}) => {
  return RequestHandler(
    async () => {
      const body = await request.json();
      const validationResult = RelationshipsSchema.parse(body);

      const response = await databaseClient.project.update({
        data: {
          techStacks: {
            connect: {
              id: validationResult.to,
            },
          },
        },
        where: {id: validationResult.from},
      });

      return {
        success: true,
        message: "Relation deleted successfully",
        data: response,
      };
    },
    {successStatusCode: 200},
  );
};