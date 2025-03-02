import type { Project, Stack } from '@prisma/client';

import { apiClient } from '@/helpers/client/axios';
import { handleServiceError } from '@/helpers/error/service-handler';

/**
 * Get stacks by not associated projects.
 * @param params - The request parameters
 * @param params.idProject - The project ID
 * @returns A list of stacks
 * @throws An error if the stacks could not be retrieved
 */
export async function getStacksByNotAssociatedProjects({
  idProject,
}: {
  idProject: Project['id'];
}): Promise<Stack[]> {
  try {
    const { data: response } = await apiClient.get<Stack[]>(
      `/api/stack/not-related/project/${idProject}.json`,
    );

    return response;
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: 'services.stack.get-stacks-by-not-associated-projects.operation-failed',
    });
  }
}
