import type { Stack } from '@prisma/client';

import { apiClient } from '@/helpers/client/axios';
import { handleServiceError } from '@/helpers/error/service-handler';

/**
 * Get all stacks
 * @returns A list of stacks
 * @throws An error if the stacks could not be retrieved
 */
export async function getAllStack(): Promise<Stack[]> {
  try {
    const { data: response } = await apiClient.get<Stack[]>('/api/stack.json');

    return response;
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: 'services.stack.get-all-stack.operation-failed',
    });
  }
}
