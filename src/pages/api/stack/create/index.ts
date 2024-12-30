import type {StackCategory, StackType} from "@prisma/client";
import type {APIRoute} from "astro";

import {databaseClient} from "../../../../helpers/client/prisma";
import {RequestHandler} from "../../../../helpers/common/request-handler";
import {StackCreateSchema} from "../../../../schemas/stack/create";

// Disable prerendering for this route
export const prerender = false;

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
        data: {
          key: validationResult.key,
          name: validationResult.name,
          description: validationResult.description,
          category: validationResult.category as StackCategory,
          type: validationResult.type as StackType,
          iconUrl: validationResult.iconUrl,
        },
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
