import type {APIRoute} from "astro";

import {RelationshipsSchema} from "@/schemas/common/relationships";
import {databaseClient} from "@/helpers/client/prisma";
import {RequestHandler} from "@/helpers/common/request-handler";

/**
 * PATCH handler to add a relation between a collaborator and a project.
 * - Parses and validates the request body.
 * - Connects the specified project to the collaborator in the database.
 */
export const PATCH: APIRoute = ({request}) => {
  return RequestHandler(
    async () => {
      const body = await request.json();
      const validationResult = RelationshipsSchema.parse(body);

      const response = await databaseClient.collaborator.update({
        data: {
          associatedProjects: {
            connect: {
              id: validationResult.idTo,
            },
          },
        },
        where: {id: validationResult.idFrom},
      });

      return {
        success: true,
        message: "Relation added successfully",
        data: response,
      };
    },
    {successStatusCode: 200},
  );
};