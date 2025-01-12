import {Prisma, type Stack} from "@prisma/client";

import {apiClient} from "@/helpers/client/axios";
import {handleServiceError} from "@/helpers/error/service-handler";

/**
 * Update a stack
 *
 * @param stackUpdateInput - Stack data
 * @returns Stack data
 * @throws An error if the stack could not be updated
 */
export async function putStack(stackUpdateInput: Prisma.StackUpdateInput): Promise<Stack> {
  try {
    const {data: response} = await apiClient.put<Stack>("/api/stack/update", stackUpdateInput);

    return response;
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: "No se pudo actualizar el stack.",
    });
  }
}
