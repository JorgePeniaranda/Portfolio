import type { EntityRelationSchema } from '@/schemas/common/entity-relation-schema';

import { apiClient } from '@/helpers/client/axios';
import { handleServiceError } from '@/helpers/error/service-handler';

/**
 * Add a collaborator to a project.
 * @param relationSchema - Relationships schema
 * @throws An error if the collaborator could not be added to the project
 */
export async function postProjectAddAssociatedCollaborator(
  relationSchema: EntityRelationSchema,
): Promise<void> {
  try {
    const { idSource, idTarget } = relationSchema;

    await apiClient.post<null>(`/api/project/id/${idTarget}/collaborator/${idSource}`);
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage:
        'services.project.post-project-add-associated-collaborator.operation-failed',
    });
  }
}
