import type {APIRoute} from "astro";

import {z} from "zod";

import {databaseClient} from "@/helpers/client/prisma";
import {RequestHandler} from "@/helpers/common/request-handler";

/**
 * GET handler to fetch a project.
 */
export const GET: APIRoute = ({params}) => {
  return RequestHandler(
    async () => {
      const key = z.coerce.string().parse(params.key);

      const response = await databaseClient.project.findUnique({
        where: {
          key,
        },
      });

      return {
        success: true,
        message: "Project fetched successfully",
        data: response,
      };
    },
    {successStatusCode: 200},
  );
};
