import type {APIRoute} from "astro";

import {z} from "zod";

import {databaseClient} from "@/helpers/client/prisma";
import {handleApiError} from "@/helpers/error/api-handler";

/**
 * GET handler to fetch a collaborator.
 */
export const GET: APIRoute = async ({params, url}) => {
  try {
    const id = z.coerce.number().parse(params.id);

    const fetchedCollaborator = await databaseClient.collaborator.findUnique({
      where: {
        id,
      },
    });

    return Response.json(fetchedCollaborator, {status: 200});
  } catch (error) {
    return handleApiError(error, url);
  }
};
