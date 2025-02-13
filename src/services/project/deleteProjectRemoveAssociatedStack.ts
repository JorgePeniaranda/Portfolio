import type { EntityRelationSchema } from '@/schemas/common/entity-relation-schema';
import type { Project } from '@prisma/client';

import { apiClient } from '@/helpers/client/axios';
import { handleServiceError } from '@/helpers/error/service-handler';

/**
 * Remove a stack from a project.
 *
 * @param relationSchema - Relationships schema.
 * @returns A promise with the project data.
 * @throws An error if the stack could not be removed from the project.
 */
export async function deleteProjectRemoveAssociatedStack(
  relationSchema: EntityRelationSchema,
): Promise<Project> {
  try {
    const { idSource, idTarget } = relationSchema;
    const { data: response } = await apiClient.delete<Project>(
      `/api/project/id/${idTarget}/stack/${idSource}`,
    );

    return response;
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: 'No se pudo eliminar el stack del proyecto.',
    });
  }
}
