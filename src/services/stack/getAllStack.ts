import type {Stack} from "@prisma/client";
import type {PaginationRequest} from "@/types/responses";

import {apiClient} from "@/helpers/client/axios";
import {handleServiceError} from "@/helpers/error/service-handler";

/**
 * Get all stacks
 *
 * @param pagination - Pagination options
 * @returns A list of stacks
 * @throws An error if the stacks could not be retrieved
 */
export async function getAllStack(pagination?: PaginationRequest): Promise<Stack[]> {
  try {
    const {data: response} = await apiClient.get<Stack[]>("/api/stack.json", {
      params: pagination,
    });

    return response;
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: "No se pudo obtener la lista de stacks.",
    });
  }
}
