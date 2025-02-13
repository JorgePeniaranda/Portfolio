import type { Prisma, Stack } from '@prisma/client';

import { apiClient } from '@/helpers/client/axios';
import { handleServiceError } from '@/helpers/error/service-handler';

/**
 * Update a stack
 *
 * @param stackUpdateInput - Stack data
 * @returns Stack data
 * @throws An error if the stack could not be updated
 */
export async function putStack({
  idStack,
  stackUpdateInput,
}: {
  idStack: Stack['id'];
  stackUpdateInput: Prisma.StackUpdateInput;
}): Promise<Stack> {
  try {
    const { data: response } = await apiClient.put<Stack>(
      `/api/stack/id/${idStack}`,
      stackUpdateInput,
    );

    return response;
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: 'No se pudo actualizar el stack.',
    });
  }
}
