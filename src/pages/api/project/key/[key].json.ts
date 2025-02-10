import type {APIRoute, GetStaticPaths} from "astro";

import {z} from "zod";

import {databaseClient} from "@/helpers/client/prisma";
import {handleApiError} from "@/helpers/error/api-handler";

/**
 * GET handler to fetch a project.
 */
export const GET: APIRoute = async ({params, url}) => {
  try {
    const key = z.coerce.string().parse(params.key);

    const fetchedProject = await databaseClient.project.findUnique({
      where: {
        key,
      },
    });

    return Response.json(fetchedProject, {status: 200});
  } catch (error) {
    return handleApiError(error, url);
  }
};

export const getStaticPaths = (async () => {
  const projects = await databaseClient.project.findMany({
    select: {
      key: true,
    },
  });

  return projects.map((project) => ({
    params: {key: project.key},
  }));
}) satisfies GetStaticPaths;
