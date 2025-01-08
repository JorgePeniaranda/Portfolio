import type {APIRoute, GetStaticPaths} from "astro";

import {z} from "zod";

import {databaseClient} from "@/helpers/client/prisma";
import {RequestHandler} from "@/helpers/common/request-handler";
import {getAllProjects} from "@/services/project/getAllProjects";

/**
 * GET handler to fetch a project.
 */
export const GET: APIRoute = ({params}) => {
  return RequestHandler(
    async () => {
      const id = z.coerce.number().parse(params.id);

      const response = await databaseClient.project.findUniqueOrThrow({
        where: {
          id,
        },
      });

      return {
        success: true,
        message: "Project fetched successfully",
        data: response,
      };
    },
    {successStatusCode: 200},
  );
};

export const getStaticPaths = (async () => {
  const projects = await getAllProjects();

  return projects.map((project) => ({
    params: {id: project.id},
  }));
}) satisfies GetStaticPaths;
