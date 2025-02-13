import type { EntityRelationSchema } from '@/schemas/common/entity-relation-schema';
import type { Project } from '@prisma/client';

import { apiClient } from '@/helpers/client/axios';
import { handleServiceError } from '@/helpers/error/service-handler';

/**
 * Add a stack to a project.
 *
 * @param relationSchema - Relationships schema.
 * @returns A promise with the project data.
 * @throws An error if the stack could not be added to the project.
 */
export async function postProjectAddAssociatedStack(
  relationSchema: EntityRelationSchema,
): Promise<Project> {
  try {
    const { idSource, idTarget } = relationSchema;
    const { data: response } = await apiClient.post<Project>(
      `/api/project/id/${idTarget}/stack/${idSource}`,
    );

    return response;
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: 'No se pudo agregar el stack al proyecto.',
    });
  }
}
