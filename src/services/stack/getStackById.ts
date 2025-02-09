import type {Stack} from "@prisma/client";

import {apiClient} from "@/helpers/client/axios";
import {handleServiceError} from "@/helpers/error/service-handler";

/**
 * Get a stack by its id.
 *
 * @param id - The id of the stack
 * @returns The stack with the given id, or null if it does not exist
 * @throws An error if the stack could not be retrieved
 */
export async function getStackById({id}: {id: Stack["id"]}): Promise<Stack | null> {
  try {
    const {data: response} = await apiClient.get<Stack | null>(`/api/stack/id/${id}.json`);

    return response;
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: "No se pudo obtener el stack.",
    });
  }
}
