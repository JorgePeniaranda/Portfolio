import type { DeleteResponse } from '@/types/responses';
import type { Stack } from '@prisma/client';

import { apiClient } from '@/helpers/client/axios';
import { handleServiceError } from '@/helpers/error/service-handler';

/**
 * Delete a stack.
 * @param stackIds - Stack ID
 * @returns A promise with the delete response
 * @throws An error if the stack could not be deleted
 */
export async function deleteStack(stackIds: Stack['id'][]): Promise<DeleteResponse> {
  try {
    const { data: response } = await apiClient.delete<DeleteResponse>('/api/stack', {
      data: stackIds,
    });

    return response;
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: 'No se pudo eliminar el stack.',
    });
  }
}
