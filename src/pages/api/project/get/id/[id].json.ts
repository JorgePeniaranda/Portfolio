import type {APIRoute, GetStaticPaths} from "astro";

import {z} from "zod";

import {databaseClient} from "@/helpers/client/prisma";
import {handleApiError} from "@/helpers/error/api-handler";

/**
 * GET handler to fetch a project.
 */
export const GET: APIRoute = async ({params}) => {
  try {
    const id = z.coerce.number().parse(params.id);

    const fetchedProject = await databaseClient.project.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return Response.json(fetchedProject, {status: 200});
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

  return projects.map((project) => ({
    params: {id: project.id},
  }));
}) satisfies GetStaticPaths;
