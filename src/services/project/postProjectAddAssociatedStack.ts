import type { EntityRelationSchema } from '@/schemas/common/entity-relation-schema';

import { apiClient } from '@/helpers/client/axios';
import { handleServiceError } from '@/helpers/error/service-handler';

/**
 * Add a stack to a project.
 * @param relationSchema - Relationships schema
 * @throws An error if the stack could not be added to the project
 */
export async function postProjectAddAssociatedStack(
  relationSchema: EntityRelationSchema,
): Promise<void> {
  try {
    const { idSource, idTarget } = relationSchema;

    await apiClient.post<null>(`/api/project/id/${idTarget}/stack/${idSource}`);
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: 'services.project.post-project-add-associated-stack.operation-failed',
    });
  }
}
