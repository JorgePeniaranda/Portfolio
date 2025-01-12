import type {APIRoute} from "astro";

import {databaseClient} from "@/helpers/client/prisma";
import {handleApiError} from "@/helpers/error/api-handler";
import {ProjectUpdateSchema} from "@/schemas/project/update";

/**
 * PUT handler to update an existing project.
 * - Parses the request body.
 * - Validates it using the `ProjectUpdateSchema`.
 * - Updates the project in the database.
 */
export const PUT: APIRoute = async ({request}) => {
  try {
    const body = await request.json();
    const validationResult = ProjectUpdateSchema.parse(body);

    const updatedProject = await databaseClient.project.update({
      data: validationResult,
      where: {id: validationResult.id},
    });

    return Response.json(updatedProject, {status: 200});
  } catch (error) {
    return handleApiError(error);
  }
};
