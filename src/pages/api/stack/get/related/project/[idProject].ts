import type {APIRoute, GetStaticPaths} from "astro";

import {z} from "zod";

import {databaseClient} from "@/helpers/client/prisma";
import {BuildPaginationByURL} from "@/helpers/common/build-pagination";
import {RequestHandler} from "@/helpers/common/request-handler";
import {fromPaginationRequestToPrismaPagination} from "@/mappers/common/fromPaginationRequestToPrismaPagination";
import {getAllProjects} from "@/services/project/getAllProjects";

/**
 * GET handler to fetch a paginated list of stacks.
 * - Pagination is optional. If provided, it must be a positive numeric value greater than 0.
 */
export const GET: APIRoute = ({request, params}) => {
  return RequestHandler(
    async () => {
      const idProject = z.coerce.number().parse(params.idProject);
      const paginationParams = BuildPaginationByURL(request.url);

      const response = await databaseClient.stack.findMany({
        where: {
          associatedProjects: {
            some: {
              id: idProject,
            },
          },
        },
        ...fromPaginationRequestToPrismaPagination(paginationParams),
      });

      return {
        success: true,
        message: "Stacks fetched successfully",
        data: response,
      };
    },
    {successStatusCode: 200},
  );
};

export const getStaticPaths = (async () => {
  const projects = await getAllProjects();

  return projects.map((project) => ({
    params: {key: project.id},
    props: project,
  }));
}) satisfies GetStaticPaths;
