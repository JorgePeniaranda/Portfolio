import type {APIRoute} from "astro";
import type {ProjectStatus, StackCategory} from "@prisma/client";

import {databaseClient} from "../../../../helpers/client/prisma";
import {RequestHandler} from "../../../../helpers/common/request-handler";
import {ProjectUpdateSchema} from "../../../../schemas/project/update";

// Disable prerendering for this route
export const prerender = false;

/**
 * PUT handler to update an existing project.
 * - Parses the request body.
 * - Validates it using the `ProjectUpdateSchema`.
 * - Updates the project in the database.
 */
export const PUT: APIRoute = ({request}) => {
  return RequestHandler(
    async () => {
      const body = await request.json();
      const validationResult = ProjectUpdateSchema.parse(body);

      const response = await databaseClient.project.update({
        data: validationResult,
        where: {id: validationResult.id},
      });

      return {
        success: true,
        message: "Project updated successfully",
        data: response,
      };
    },
    {successStatusCode: 200},
  );
};
