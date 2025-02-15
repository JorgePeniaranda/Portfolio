import type { EntityRelationSchema } from '@/schemas/common/entity-relation-schema';
import type { Project } from '@prisma/client';

import { apiClient } from '@/helpers/client/axios';
import { handleServiceError } from '@/helpers/error/service-handler';

/**
 * Add a collaborator to a project.
 * @param relationSchema - Relationships schema
 * @returns A promise with the project data
 * @throws An error if the collaborator could not be added to the project
 */
export async function postProjectAddAssociatedCollaborator(
  relationSchema: EntityRelationSchema,
): Promise<Project> {
  try {
    const { idSource, idTarget } = relationSchema;
    const { data: response } = await apiClient.post<Project>(
      `/api/project/id/${idTarget}/collaborator/${idSource}`,
    );

    return response;
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: 'No se pudo agregar el colaborador al proyecto.',
    });
  }
}
