import type {APIRoute, GetStaticPaths} from "astro";

import {z} from "zod";

import {databaseClient} from "@/helpers/client/prisma";
import {RequestHandler} from "@/helpers/common/request-handler";
import {getAllStack} from "@/services/stack/getAllStack";

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
  const stacks = await getAllStack();

  return stacks.map((stack) => ({
    params: {key: stack.id},
    props: stack,
  }));
}) satisfies GetStaticPaths;
