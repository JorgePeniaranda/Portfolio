import type {APIRoute} from "astro";

import {databaseClient} from "@/helpers/client/prisma";
import {handleApiError} from "@/helpers/error/api-handler";
import {ProjectCreateSchema} from "@/schemas/project/create";

/**
 * POST handler to create a new projects.
 * - Parses the request body.
 * - Validates it using the `ProjectCreateSchema`.
 * - Creates a new projects in the database.
 */
export const POST: APIRoute = async ({request}) => {
  try {
    const body = await request.json();
    const validationResult = ProjectCreateSchema.parse(body);

    const createdProject = await databaseClient.project.create({
      data: validationResult,
    });

    return Response.json(createdProject, {status: 201});
  } catch (error) {
    return handleApiError(error);
  }
};
