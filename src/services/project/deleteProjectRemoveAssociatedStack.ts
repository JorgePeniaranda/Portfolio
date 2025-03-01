import type { EntityRelationSchema } from '@/schemas/common/entity-relation-schema';

import { apiClient } from '@/helpers/client/axios';
import { handleServiceError } from '@/helpers/error/service-handler';

/**
 * Remove a stack from a project.
 * @param relationSchema - Relationships schema
 * @throws An error if the stack could not be removed from the project
 */
export async function deleteProjectRemoveAssociatedStack(
  relationSchema: EntityRelationSchema,
): Promise<void> {
  try {
    const { idSource, idTarget } = relationSchema;

    await apiClient.delete<null>(`/api/project/id/${idTarget}/stack/${idSource}`);
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: 'No se pudo eliminar el stack del proyecto.',
    });
  }
}
