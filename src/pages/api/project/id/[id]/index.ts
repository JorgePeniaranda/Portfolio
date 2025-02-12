import type { APIRoute, GetStaticPaths } from 'astro';

import { z } from 'zod';

import { databaseClient } from '@/helpers/client/prisma';
import { handleApiError } from '@/helpers/error/api-handler';
import { ProjectUpdateSchema } from '@/schemas/project/update';

/**
 * PUT handler to update an existing project.
 * - Parses the request body.
 * - Validates it using the `ProjectUpdateSchema`.
 * - Updates the project in the database.
 */
export const PUT: APIRoute = async ({ request, params, url }) => {
  try {
    const id = z.coerce.number().parse(params.id);
    const body = await request.json();

    const validationResult = ProjectUpdateSchema.parse(body);

    const updatedProject = await databaseClient.project.update({
      data: validationResult,
      where: { id },
    });

    return Response.json(updatedProject, { status: 200 });
  } catch (error) {
    return handleApiError(error, url);
  }
};

export const getStaticPaths = (async () => {
  const projects = await databaseClient.project.findMany({
    select: {
      id: true,
    },
  });

  return projects.map((project) => ({
    params: { id: project.id },
  }));
}) satisfies GetStaticPaths;
