import type {APIRoute} from "astro";

import {databaseClient} from "@/helpers/client/prisma";
import {handleApiError} from "@/helpers/error/api-handler";
import {StackCreateSchema} from "@/schemas/stack/create";

/**
 * POST handler to create a new stack.
 * - Parses the request body.
 * - Validates it using the `StackCreateSchema`.
 * - Creates a new stack in the database.
 */
export const POST: APIRoute = async ({request}) => {
  try {
    const body = await request.json();
    const validationResult = StackCreateSchema.parse(body);

    const response = await databaseClient.stack.create({
      data: validationResult,
    });

    return Response.json(response, {status: 201});
  } catch (error) {
    return handleApiError(error);
  }
};
