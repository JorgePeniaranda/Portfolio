import type { Project } from '@prisma/client';
import type { ProjectCreateSchema } from '@/schemas/project/create';

import { apiClient } from '@/helpers/client/axios';
import { handleServiceError } from '@/helpers/error/service-handler';

/**
 * Create a new project.
 * @param projectInput - The project data
 * @returns The created project
 * @throws An error if the operation fails
 */
export async function postProject(projectInput: ProjectCreateSchema): Promise<Project> {
  try {
    const { data: response } = await apiClient.post<Project>('/api/project', projectInput);

    return response;
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: 'No se pudo crear el proyecto.',
    });
  }
}
