import type { Project } from '@prisma/client';

import { apiClient } from '@/helpers/client/axios';
import { handleServiceError } from '@/helpers/error/service-handler';

/**
 * Get a project by its id.
 * @param params - Function parameters
 * @param params.id - The id of the project
 * @returns The project with the given id, or null if it does not exist
 * @throws An error if the project could not be retrieved
 */
export async function getProjectById({ id }: { id: Project['id'] }): Promise<Project | null> {
  try {
    const { data: response } = await apiClient.get<Project | null>(`/api/project/id/${id}.json`);

    return response;
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: 'services.project.get-project-by-id.operation-failed',
    });
  }
}
