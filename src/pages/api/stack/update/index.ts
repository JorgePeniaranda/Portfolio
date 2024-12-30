import type {StackCategory, StackType} from "@prisma/client";
import type {APIRoute} from "astro";

import {databaseClient} from "../../../../helpers/client/prisma";
import {RequestHandler} from "../../../../helpers/common/request-handler";
import {StackUpdateSchema} from "../../../../schemas/stack/update";

// Disable prerendering for this route
export const prerender = false;

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
        data: {
          key: validationResult.key,
          name: validationResult.name,
          description: validationResult.description,
          category: validationResult.category as StackCategory,
          type: validationResult.type as StackType,
          iconUrl: validationResult.iconUrl,
        },
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
