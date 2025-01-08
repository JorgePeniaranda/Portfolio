import type {APIRoute} from "astro";

import {databaseClient} from "@/helpers/client/prisma";
import {RequestHandler} from "@/helpers/common/request-handler";
import {StackCreateSchema} from "@/schemas/stack/create";

/**
 * POST handler to create a new stack.
 * - Parses the request body.
 * - Validates it using the `StackCreateSchema`.
 * - Creates a new stack in the database.
 */
export const POST: APIRoute = ({request}) => {
  return RequestHandler(
    async () => {
      const body = await request.json();
      const validationResult = StackCreateSchema.parse(body);
      const response = await databaseClient.stack.create({
        data: validationResult,
      });

      return {
        success: true,
        message: "Stack created successfully",
        data: response,
      };
    },
    {successStatusCode: 201},
  );
};
