import type { APIRoute, GetStaticPaths } from 'astro';

import { z } from 'zod';

import { databaseClient } from '@/helpers/client/prisma';
import { handleApiError } from '@/helpers/error/api-handler';

/**
 * POST handler to add a relation between a stack and a project.
 * - Parses and validates the params.
 * - Connects the specified project to the stack in the database.
 * @param params Function parameters
 * @param params.params The request parameters
 * @param params.url The request URL
 * @returns A null response
 */
export const POST: APIRoute = async ({ params, url }) => {
  try {
    const idFrom = z.coerce.number().parse(params.id);
    const idTo = z.coerce.number().parse(params.idProject);

    await databaseClient.stack.update({
      data: {
        associatedProjects: {
          connect: {
            id: idTo,
          },
        },
      },
      where: { id: idFrom },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    return handleApiError(error, url);
  }
};

/**
 * DELETE handler to remove a relation between a stack and a project.
 * - Parses and validates the params.
 * - Disconnects the specified project from the stack in the database.
 * @param params Function parameters
 * @param params.params The request parameters
 * @param params.url The request URL
 * @returns A null response
 */
export const DELETE: APIRoute = async ({ params, url }) => {
  try {
    const idFrom = z.coerce.number().parse(params.id);
    const idTo = z.coerce.number().parse(params.idProject);

    await databaseClient.stack.update({
      data: {
        associatedProjects: {
          disconnect: {
            id: idTo,
          },
        },
      },
      where: { id: idFrom },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    return handleApiError(error, url);
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

  return stacks.flatMap((stack) =>
    projects.map((project) => ({
      params: {
        id: stack.id,
        idProject: project.id,
      },
    })),
  );
}) satisfies GetStaticPaths;
