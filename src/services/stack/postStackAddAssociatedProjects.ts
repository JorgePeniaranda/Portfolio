import type { EntityRelationSchema } from '@/schemas/common/entity-relation-schema';

import { apiClient } from '@/helpers/client/axios';
import { handleServiceError } from '@/helpers/error/service-handler';

/**
 * Add a project to a stack.
 * @param relationSchema - Relationships schema
 * @throws An error if the project could not be added to the stack
 */
export async function postStackAddAssociatedProjects(
  relationSchema: EntityRelationSchema,
): Promise<void> {
  try {
    const { idSource, idTarget } = relationSchema;

    await apiClient.post<null>(`/api/stack/id/${idTarget}/project/${idSource}`);
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: 'No se pudo agregar el proyecto al stack.',
    });
  }
}
