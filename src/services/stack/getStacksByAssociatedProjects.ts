import type { Stack } from '@prisma/client';

import { apiClient } from '@/helpers/client/axios';
import { handleServiceError } from '@/helpers/error/service-handler';

/**
 * Get stacks by associated projects.
 *
 * @param idProject - The project ID
 * @returns A list of stacks
 * @throws An error if the stacks could not be retrieved
 */
export async function getStacksByAssociatedProjects({
  idProject,
}: {
  idProject: Stack['id'];
}): Promise<Stack[]> {
  try {
    const { data: response } = await apiClient.get<Stack[]>(
      `/api/stack/related/project/${idProject}.json`,
    );

    return response;
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: 'No se pudo obtener la lista de stacks.',
    });
  }
}
