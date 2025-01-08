import type {APIRoute, GetStaticPaths} from "astro";

import {z} from "zod";

import {databaseClient} from "@/helpers/client/prisma";
import {RequestHandler} from "@/helpers/common/request-handler";

/**
 * GET handler to fetch a collaborator.
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
        message: "Collaborator fetched successfully",
        data: response,
      };
    },
    {successStatusCode: 200},
  );
};

export const getStaticPaths = (async () => {
  const collaborators = await databaseClient.collaborator.findMany({
    select: {
      id: true,
    },
  });

  return collaborators.map((collaborator) => ({
    params: {id: collaborator.id},
  }));
}) satisfies GetStaticPaths;
