import type { Collaborator, Project } from '@prisma/client';

import { apiClient } from '@/helpers/client/axios';
import { handleServiceError } from '@/helpers/error/service-handler';

/**
 * Get projects by not associated collaborator.
 * @param params - Function parameters
 * @param params.idCollaborator - The collaborator ID
 * @returns A list of projects
 * @throws An error if the projects could not be retrieved
 */
export async function getProjectsByNotAssociatedCollaborator({
  idCollaborator,
}: {
  idCollaborator: Collaborator['id'];
}): Promise<Project[]> {
  try {
    const { data: response } = await apiClient.get<Project[]>(
      `/api/project/not-related/collaborator/${idCollaborator}.json`,
    );

    return response;
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage:
        'services.project.get-projects-by-not-associated-collaborator.operation-failed',
    });
  }
}
