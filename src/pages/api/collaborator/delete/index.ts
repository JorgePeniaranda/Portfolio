import type {APIRoute} from "astro";

import {z} from "zod";

import {databaseClient} from "@/helpers/client/prisma";
import {handleApiError} from "@/helpers/error/api-handler";

/**
 * POST handler to remove multiple collaborators.
 * - Parses the request body.
 * - Validates it as an array of numbers (IDs).
 * - Deletes collaborators from the database.
 */
export const POST: APIRoute = async ({request}) => {
  try {
    const body = await request.json();
    const validationResult = z.array(z.number()).parse(body);

    const deletedItemsCount = await databaseClient.collaborator.deleteMany({
      where: {id: {in: validationResult}},
    });

    return Response.json(deletedItemsCount, {status: 200});
  } catch (error) {
    return handleApiError(error);
  }
};
