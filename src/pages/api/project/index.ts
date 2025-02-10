import type {APIRoute} from "astro";

import {z} from "zod";

import {databaseClient} from "@/helpers/client/prisma";
import {handleApiError} from "@/helpers/error/api-handler";
import {ProjectCreateSchema} from "@/schemas/project/create";

/**
 * POST handler to create a new projects.
 * - Parses the request body.
 * - Validates it using the `ProjectCreateSchema`.
 * - Creates a new projects in the database.
 */
export const POST: APIRoute = async ({request, url}) => {
  try {
    const body = await request.json();
    const validationResult = ProjectCreateSchema.parse(body);

    const createdProject = await databaseClient.project.create({
      data: validationResult,
    });

    return Response.json(createdProject, {status: 201});
  } catch (error) {
    return handleApiError(error, url);
  }
};

/**
 * DELETE handler to remove multiple projects.
 * - Parses the request body.
 * - Validates it as an array of numbers (IDs).
 * - Deletes projects from the database.
 */
export const DELETE: APIRoute = async ({request, url}) => {
  try {
    const body = await request.json();
    const validationResult = z.array(z.number()).parse(body);

    const deletedItemsCount = await databaseClient.project.deleteMany({
      where: {id: {in: validationResult}},
    });

    return Response.json(deletedItemsCount, {status: 200});
  } catch (error) {
    return handleApiError(error, url);
  }
};
