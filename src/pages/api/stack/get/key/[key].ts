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
      const key = z.coerce.string().parse(params.key);

      const response = await databaseClient.stack.findUnique({
        where: {
          key,
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

export async function getStaticPaths() {
  const stacks = await getAllStack();

  return stacks.map((stack) => ({
    params: {key: stack.key},
  }));
}
