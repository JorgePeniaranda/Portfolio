import type { RelationshipsSchema } from '@/schemas/common/relationships';
import type { Project } from '@prisma/client';

import { apiClient } from '@/helpers/client/axios';
import { handleServiceError } from '@/helpers/error/service-handler';

/**
 * Remove a stack from a project.
 *
 * @param relationshipSchema - Relationships schema.
 * @returns A promise with the project data.
 * @throws An error if the stack could not be removed from the project.
 */
export async function deleteProjectRemoveAssociatedStack(
  relationshipSchema: RelationshipsSchema,
): Promise<Project> {
  try {
    const { idFrom, idTo } = relationshipSchema;
    const { data: response } = await apiClient.delete<Project>(
      `/api/project/id/${idFrom}/stack/${idTo}`,
    );

    return response;
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: 'No se pudo eliminar el stack del proyecto.',
    });
  }
}
