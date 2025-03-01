import type { EntityRelationSchema } from '@/schemas/common/entity-relation-schema';

import { apiClient } from '@/helpers/client/axios';
import { handleServiceError } from '@/helpers/error/service-handler';

/**
 * Remove a project from a stack.
 * @param relationSchema - Relationships schema
 * @throws An error if the project could not be removed from the stack
 */
export async function deleteStackRemoveAssociatedProjects(
  relationSchema: EntityRelationSchema,
): Promise<void> {
  try {
    const { idSource, idTarget } = relationSchema;

    await apiClient.delete<null>(`/api/stack/id/${idTarget}/project/${idSource}`);
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: 'No se pudo eliminar el proyecto del stack.',
    });
  }
}
