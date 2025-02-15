import type { Collaborator } from '@prisma/client';

import { apiClient } from '@/helpers/client/axios';
import { handleServiceError } from '@/helpers/error/service-handler';

/**
 * Get all collaborators
 * @returns A list of collaborators
 * @throws An error if the collaborators could not be retrieved
 */
export async function getAllCollaborator(): Promise<Collaborator[]> {
  try {
    const { data: response } = await apiClient.get<Collaborator[]>('/api/collaborator.json');

    return response;
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: 'No se pudo obtener la lista de colaboradores.',
    });
  }
}
