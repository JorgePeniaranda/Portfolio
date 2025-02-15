import type { Collaborator } from '@prisma/client';
import type { CollaboratorUpdateSchema } from '@/schemas/collaborator/update';

import { apiClient } from '@/helpers/client/axios';
import { handleServiceError } from '@/helpers/error/service-handler';

/**
 * Update a collaborator.
 * @param params - Function parameters
 * @param params.idCollaborator - The collaborator ID
 * @param params.updatedCollaborator - The collaborator to update
 * @returns The updated collaborator
 * @throws An error if the operation fails
 */
export async function putCollaborator({
  idCollaborator,
  updatedCollaborator,
}: {
  idCollaborator: Collaborator['id'];
  updatedCollaborator: CollaboratorUpdateSchema;
}): Promise<Collaborator> {
  try {
    const { data: response } = await apiClient.put<Collaborator>(
      `/api/collaborator/id/${idCollaborator}`,
      updatedCollaborator,
    );

    return response;
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: 'No se pudo actualizar el colaborador.',
    });
  }
}
