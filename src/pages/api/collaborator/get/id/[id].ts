import type {APIRoute, GetStaticPaths} from "astro";

import {z} from "zod";

import {databaseClient} from "@/helpers/client/prisma";
import {RequestHandler} from "@/helpers/common/request-handler";
import {getAllCollaborator} from "@/services/collaborator/getAllCollaborator";

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

export async function getStaticPaths() {
  const collaborator = await getAllCollaborator();

  return collaborator.map((collaborator) => ({
    params: {id: collaborator.id},
  }));
}
