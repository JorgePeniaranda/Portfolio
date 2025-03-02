import type { Project, Stack } from '@prisma/client';

import { apiClient } from '@/helpers/client/axios';
import { handleServiceError } from '@/helpers/error/service-handler';

/**
 * Get projects by not associated stack.
 * @param params - Function parameters
 * @param params.idStack - The stack ID
 * @returns A list of projects
 * @throws An error if the projects could not be retrieved
 */
export async function getProjectsByNotAssociatedStack({
  idStack,
}: {
  idStack: Stack['id'];
}): Promise<Project[]> {
  try {
    const { data: response } = await apiClient.get<Project[]>(
      `/api/project/not-related/stack/${idStack}.json`,
    );

    return response;
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: 'services.project.get-projects-by-not-associated-stack.operation-failed',
    });
  }
}
