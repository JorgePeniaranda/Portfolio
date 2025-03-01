import type { EntityRelationSchema } from '../../schemas/common/entity-relation-schema';

import { apiClient } from '@/helpers/client/axios';
import { handleServiceError } from '@/helpers/error/service-handler';

/**
 * This service is responsible for adding a project to a collaborator.
 * @param relationSchema - Object with the collaborator and project data
 * @throws An error if the collaborator and project data could not be added
 */
export async function postCollaboratorAddAssociatedProjects(
  relationSchema: EntityRelationSchema,
): Promise<void> {
  try {
    const { idSource, idTarget } = relationSchema;

    await apiClient.post<null>(`/api/collaborator/id/${idTarget}/project/${idSource}`);
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: 'No se pudo agregar el proyecto al colaborador.',
    });
  }
}
