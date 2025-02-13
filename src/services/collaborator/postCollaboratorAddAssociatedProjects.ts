import type { RelationshipsSchema } from '../../schemas/common/relationships';

import { apiClient } from '@/helpers/client/axios';
import { handleServiceError } from '@/helpers/error/service-handler';

/**
 * This service is responsible for adding a project to a collaborator.
 *
 * @param relationSchema - Object with the collaborator and project data.
 * @returns A promise with the collaborator and project data.
 * @throws An error if the collaborator and project data could not be added.
 */
export async function postCollaboratorAddAssociatedProjects(
  relationSchema: RelationshipsSchema,
): Promise<void> {
  try {
    const { idFrom, idTo } = relationSchema;
    const { data: response } = await apiClient.post<void>(
      `/api/collaborator/id/${idFrom}/project/${idTo}`,
    );

    return response;
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: 'No se pudo agregar el proyecto al colaborador.',
    });
  }
}
