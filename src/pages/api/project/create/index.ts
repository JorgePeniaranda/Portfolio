import type {APIRoute} from "astro";
import type {ProjectStatus, StackCategory} from "@prisma/client";

import {databaseClient} from "../../../../helpers/client/prisma";
import {RequestHandler} from "../../../../helpers/common/request-handler";
import {ProjectCreateSchema} from "../../../../schemas/project/create";

// Disable prerendering for this route
export const prerender = false;

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
        data: {
          name: validationResult.name,
          description: validationResult.description,
          status: validationResult.status as ProjectStatus,
          startDate: validationResult.startDate,
          endDate: validationResult.endDate,
          githubUrl: validationResult.githubUrl,
          key: validationResult.key,
          stack: validationResult.stack as StackCategory,
          logoUrl: validationResult.logoUrl,
          primaryColor: validationResult.primaryColor,
        },
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
