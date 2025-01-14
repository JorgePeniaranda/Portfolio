import type {APIRoute} from "astro";

import {databaseClient} from "@/helpers/client/prisma";
import {handleApiError} from "@/helpers/error/api-handler";
import {StackUpdateSchema} from "@/schemas/stack/update";

/**
 * PUT handler to update an existing stack.
 * - Parses the request body.
 * - Validates it using the `StackUpdateSchema`.
 * - Updates the stack in the database.
 */
export const PUT: APIRoute = async ({request}) => {
  try {
    const body = await request.json();
    const validationResult = StackUpdateSchema.parse(body);

    const updatedStack = await databaseClient.stack.update({
      data: validationResult,
      where: {id: validationResult.id},
    });

    return Response.json(updatedStack, {status: 200});
  } catch (error) {
    return handleApiError(error);
  }
};
