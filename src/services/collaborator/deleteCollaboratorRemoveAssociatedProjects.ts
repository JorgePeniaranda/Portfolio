import type { EntityRelationSchema } from '../../schemas/common/entity-relation-schema';

import { apiClient } from '@/helpers/client/axios';
import { handleServiceError } from '@/helpers/error/service-handler';

/**
 * This service is responsible for removing a project from a collaborator.
 * @param relationSchema - Object with the collaborator and project data
 * @throws An error if the collaborator and project data could not be removed
 */
export async function deleteCollaboratorRemoveAssociatedProjects(
  relationSchema: EntityRelationSchema,
): Promise<void> {
  try {
    const { idSource, idTarget } = relationSchema;

    await apiClient.delete<null>(`/api/collaborator/id/${idTarget}/project/${idSource}`);
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage:
        'services.collaborator.delete-collaborator-remove-associated-projects.operation-failed',
    });
  }
}
