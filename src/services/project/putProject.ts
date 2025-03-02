import type { Project } from '@prisma/client';
import type { ProjectUpdateSchema } from '@/schemas/project/update';

import { apiClient } from '@/helpers/client/axios';
import { handleServiceError } from '@/helpers/error/service-handler';

/**
 * Updates a project.
 * @param params - Function parameters
 * @param params.idProject - The project ID
 * @param params.projectUpdateInput - The project data
 * @returns The updated project
 * @throws An error if the operation fails
 */
export async function putProject({
  idProject,
  projectUpdateInput,
}: {
  idProject: Project['id'];
  projectUpdateInput: ProjectUpdateSchema;
}): Promise<Project> {
  try {
    const { data: response } = await apiClient.put<Project>(
      `/api/project/id/${idProject}`,
      projectUpdateInput,
    );

    return response;
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: 'services.project.put-project.operation-failed',
    });
  }
}
