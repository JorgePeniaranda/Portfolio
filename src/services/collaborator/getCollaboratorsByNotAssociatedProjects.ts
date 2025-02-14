import type { Collaborator, Project } from '@prisma/client';

import { apiClient } from '@/helpers/client/axios';
import { handleServiceError } from '@/helpers/error/service-handler';

/**
 * Get collaborators by not associated projects.
 *
 * @param idProject - The project ID
 * @returns A list of collaborators
 * @throws An error if the collaborators could not be retrieved
 */
export async function getCollaboratorsByNotAssociatedProjects({
  idProject,
}: {
  idProject: Project['id'];
}): Promise<Array<Collaborator>> {
  try {
    const { data: response } = await apiClient.get<Collaborator[]>(
      `/api/collaborator/not-related/project/${idProject}.json`,
    );

    return response;
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: 'No se pudo obtener la lista de colaboradores.',
    });
  }
}
