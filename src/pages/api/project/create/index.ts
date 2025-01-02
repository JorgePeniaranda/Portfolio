import type {APIRoute} from "astro";

import {ProjectCreateSchema} from "@/schemas/project/create";
import {databaseClient} from "@/helpers/client/prisma";
import {RequestHandler} from "@/helpers/common/request-handler";

/**
 * POST handler to create a new projects.
 * - Parses the request body.
 * - Validates it using the `ProjectCreateSchema`.
 * - Creates a new projects in the database.
 */
export const POST: APIRoute = ({request}) => {
  return RequestHandler(
    async () => {
      const body = await request.json();
      const validationResult = ProjectCreateSchema.parse(body);
      const response = await databaseClient.project.create({
        data: validationResult,
      });

      return {
        success: true,
        message: "Projects created successfully",
        data: response,
      };
    },
    {successStatusCode: 201},
  );
};
