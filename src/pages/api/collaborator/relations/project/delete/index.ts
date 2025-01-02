import type {APIRoute} from "astro";

import {databaseClient} from "@/helpers/client/prisma";
import {RequestHandler} from "@/helpers/common/request-handler";
import {RelationshipsSchema} from "@/schemas/common/relationships";

/**
 * PATCH handler to remove a relation between a collaborator and a project.
 * - Parses and validates the request body.
 * - Disconnects the specified project from the collaborator in the database.
 */
export const PATCH: APIRoute = ({request}) => {
  return RequestHandler(
    async () => {
      const body = await request.json();
      const validationResult = RelationshipsSchema.parse(body);

      const response = await databaseClient.collaborator.update({
        data: {
          associatedProjects: {
            disconnect: {
              id: validationResult.idTo,
            },
          },
        },
        where: {id: validationResult.idFrom},
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
