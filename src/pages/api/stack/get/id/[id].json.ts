import type {APIRoute, GetStaticPaths} from "astro";

import {z} from "zod";

import {databaseClient} from "@/helpers/client/prisma";
import {RequestHandler} from "@/helpers/common/request-handler";

/**
 * GET handler to fetch a stack.
 */
export const GET: APIRoute = ({params}) => {
  return RequestHandler(
    async () => {
      const id = z.coerce.number().parse(params.id);

      const response = await databaseClient.stack.findUnique({
        where: {
          id,
        },
      });

      return {
        success: true,
        message: "Stack fetched successfully",
        data: response,
      };
    },
    {successStatusCode: 200},
  );
};

export const getStaticPaths = (async () => {
  const stacks = await databaseClient.stack.findMany({
    select: {
      id: true,
    },
  });

  return stacks.map((stack) => ({
    params: {id: stack.id},
  }));
}) satisfies GetStaticPaths;
