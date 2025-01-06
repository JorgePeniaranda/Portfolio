import type {APIRoute} from "astro";

import {z} from "zod";

import {databaseClient} from "@/helpers/client/prisma";
import {RequestHandler} from "@/helpers/common/request-handler";

/**
 * GET handler to fetch a collaborator.
 * - Pagination is optional. If provided, it must be a positive numeric value greater than 0.
 */
export const GET: APIRoute = ({params}) => {
  return RequestHandler(
    async () => {
      const id = z.coerce.number().parse(params.id);

      const response = await databaseClient.collaborator.findUnique({
        where: {
          id,
        },
      });

      return {
        success: true,
        message: "Collaborators fetched successfully",
        data: response,
      };
    },
    {successStatusCode: 200},
  );
};
