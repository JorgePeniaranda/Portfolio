import type { Stack } from '@prisma/client';
import type { StackCreateSchema } from '@/schemas/stack/create';

import { apiClient } from '@/helpers/client/axios';
import { handleServiceError } from '@/helpers/error/service-handler';

/**
 * Create a new stack.
 * @param stackUpdateInput - The stack data
 * @returns The created stack
 * @throws An error if the operation fails
 */
export async function postStack(stackUpdateInput: StackCreateSchema): Promise<Stack> {
  try {
    const { data: response } = await apiClient.post<Stack>('/api/stack', stackUpdateInput);

    return response;
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: 'No se pudo crear el stack.',
    });
  }
}
