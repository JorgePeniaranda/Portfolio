import type { EntityRelationSchema } from '@/schemas/common/entity-relation-schema';
import type { Stack } from '@prisma/client';

import { apiClient } from '@/helpers/client/axios';
import { handleServiceError } from '@/helpers/error/service-handler';

/**
 * Add a project to a stack.
 * @param relationSchema - Relationships schema
 * @returns A promise with the stack data
 * @throws An error if the project could not be added to the stack
 */
export async function postStackAddAssociatedProjects(
  relationSchema: EntityRelationSchema,
): Promise<Stack> {
  try {
    const { idSource, idTarget } = relationSchema;
    const { data: response } = await apiClient.post<Stack>(
      `/api/stack/id/${idTarget}/project/${idSource}`,
    );

    return response;
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: 'No se pudo agregar el proyecto al stack.',
    });
  }
}
