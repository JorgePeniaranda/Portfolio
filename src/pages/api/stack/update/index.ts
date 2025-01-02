import type {APIRoute} from "astro";

import {StackUpdateSchema} from "@/schemas/stack/update";
import {databaseClient} from "@/helpers/client/prisma";
import {RequestHandler} from "@/helpers/common/request-handler";

/**
 * PUT handler to update an existing stack.
 * - Parses the request body.
 * - Validates it using the `StackUpdateSchema`.
 * - Updates the stack in the database.
 */
export const PUT: APIRoute = ({request}) => {
  return RequestHandler(
    async () => {
      const body = await request.json();
      const validationResult = StackUpdateSchema.parse(body);

      const response = await databaseClient.stack.update({
        data: validationResult,
        where: {id: validationResult.id},
      });

      return {
        success: true,
        message: "Stack updated successfully",
        data: response,
      };
    },
    {successStatusCode: 200},
  );
};
