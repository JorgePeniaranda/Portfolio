import type { Collaborator, Stack } from '@prisma/client';

import { apiClient } from '@/helpers/client/axios';
import { handleServiceError } from '@/helpers/error/service-handler';

/**
 * Get collaborators by associated projects.
 * @param params - Function parameters
 * @param params.idProject - The project ID
 * @returns A list of collaborators
 * @throws An error if the collaborators could not be retrieved
 */
export async function getCollaboratorsByAssociatedProjects({
  idProject,
}: {
  idProject: Stack['id'];
}): Promise<Collaborator[]> {
  try {
    const { data: response } = await apiClient.get<Collaborator[]>(
      `/api/collaborator/related/project/${idProject}.json`,
    );

    return response;
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: 'No se pudo obtener la lista de colaboradores.',
    });
  }
}
