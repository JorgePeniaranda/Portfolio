import type {APIRoute, GetStaticPaths} from "astro";

import {z} from "zod";

import {databaseClient} from "@/helpers/client/prisma";
import {handleApiError} from "@/helpers/error/api-handler";

/**
 * POST handler to add a relation between a project and a technology stack.
 * - Parses and validates the params.
 * - Connects the specified tech stack to the project in the database.
 */
export const POST: APIRoute = async ({params}) => {
  try {
    const idFrom = z.coerce.number().parse(params.id);
    const idTo = z.coerce.number().parse(params.idStack);

    await databaseClient.project.update({
      data: {
        associatedStacks: {
          connect: {
            id: idTo,
          },
        },
      },
      where: {id: idFrom},
    });

    return new Response(null, {status: 204});
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * DELETE handler to remove a relation between a project and a technology stack.
 * - Parses and validates the params.
 * - Disconnects the specified tech stack from the project in the database.
 */
export const DELETE: APIRoute = async ({params}) => {
  try {
    const idFrom = z.coerce.number().parse(params.id);
    const idTo = z.coerce.number().parse(params.idStack);

    await databaseClient.project.update({
      data: {
        associatedStacks: {
          disconnect: {
            id: idTo,
          },
        },
      },
      where: {id: idFrom},
    });

    return new Response(null, {status: 204});
  } catch (error) {
    return handleApiError(error);
  }
};

export const getStaticPaths = (async () => {
  const stacks = await databaseClient.stack.findMany({
    select: {
      id: true,
    },
  });

  const projects = await databaseClient.project.findMany({
    select: {
      id: true,
    },
  });

  return projects.flatMap((project) =>
    stacks.map((stack) => ({
      params: {
        idProject: project.id,
        idCollaborator: stack.id,
      },
    })),
  );
}) satisfies GetStaticPaths;
