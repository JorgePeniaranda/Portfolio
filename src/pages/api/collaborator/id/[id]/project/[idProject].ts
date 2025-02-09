import type {APIRoute, GetStaticPaths} from "astro";

import {z} from "zod";

import {databaseClient} from "@/helpers/client/prisma";
import {handleApiError} from "@/helpers/error/api-handler";

/**
 * POST handler to add a relation between a collaborator and a project.
 * - Parses and validates the request body.
 * - Connects the specified project to the collaborator in the database.
 */
export const POST: APIRoute = async ({params}) => {
  try {
    const idFrom = z.coerce.number().parse(params.id);
    const idTo = z.coerce.number().parse(params.idProject);

    await databaseClient.collaborator.update({
      data: {
        associatedProjects: {
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
 * DELETE handler to remove a relation between a collaborator and a project.
 * - Parses and validates the request body.
 * - Disconnects the specified project from the collaborator in the database.
 */
export const DELETE: APIRoute = async ({params}) => {
  try {
    const idFrom = z.coerce.number().parse(params.id);
    const idTo = z.coerce.number().parse(params.idProject);

    await databaseClient.collaborator.update({
      data: {
        associatedProjects: {
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
  const projects = await databaseClient.project.findMany({
    select: {
      id: true,
    },
  });

  // const collaborators = await databaseClient.collaborator.findMany({
  //   select: {
  //     id: true,
  //   },
  // });

  return projects.map((project) => ({
    params: {idProject: project.id},
  }));
}) satisfies GetStaticPaths;
