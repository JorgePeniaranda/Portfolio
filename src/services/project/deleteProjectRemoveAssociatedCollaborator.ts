import type { EntityRelationSchema } from '@/schemas/common/entity-relation-schema';

import { apiClient } from '@/helpers/client/axios';
import { handleServiceError } from '@/helpers/error/service-handler';

/**
 * Remove a collaborator from a project.
 * @param relationSchema - Relationships schema
 * @throws An error if the collaborator could not be removed from the project
 */
export async function deleteProjectRemoveAssociatedCollaborator(
  relationSchema: EntityRelationSchema,
): Promise<void> {
  try {
    const { idSource, idTarget } = relationSchema;

    await apiClient.delete<null>(`/api/project/id/${idTarget}/collaborator/${idSource}`);
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage:
        'services.project.delete-project-remove-associated-collaborator.operation-failed',
    });
  }
}
