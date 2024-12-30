import type {APIRoute} from "astro";

import {z} from "zod";

import {databaseClient} from "../../../../helpers/client/prisma";
import {RequestHandler} from "../../../../helpers/common/request-handler";

// Disable prerendering for this route
export const prerender = false;

/**
 * POST handler to remove multiple collaborators.
 * - Parses the request body.
 * - Validates it as an array of numbers (IDs).
 * - Deletes collaborators from the database.
 */
export const POST: APIRoute = ({request}) => {
  return RequestHandler(
    async () => {
      const body = await request.json();
      const validationResult = z.array(z.number()).parse(body);

      const response = await databaseClient.colaborator.deleteMany({
        where: {id: {in: validationResult}},
      });

      return {
        success: true,
        message: "Collaborators deleted successfully",
        data: response,
      };
    },
    {successStatusCode: 200},
  );
};
