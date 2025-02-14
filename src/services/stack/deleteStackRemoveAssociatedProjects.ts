import type { EntityRelationSchema } from '@/schemas/common/entity-relation-schema';
import type { Stack } from '@prisma/client';

import { apiClient } from '@/helpers/client/axios';
import { handleServiceError } from '@/helpers/error/service-handler';

/**
 * Remove a project from a stack.
 *
 * @param relationSchema - Relationships schema.
 * @returns A promise with the stack data.
 * @throws An error if the project could not be removed from the stack.
 */
export async function deleteStackRemoveAssociatedProjects(
  relationSchema: EntityRelationSchema,
): Promise<Stack> {
  try {
    const { idSource, idTarget } = relationSchema;
    const { data: response } = await apiClient.delete<Stack>(
      `/api/stack/id/${idTarget}/project/${idSource}`,
    );

    return response;
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: 'No se pudo eliminar el proyecto del stack.',
    });
  }
}
