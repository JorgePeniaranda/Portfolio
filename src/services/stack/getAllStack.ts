import type {Stack} from "@prisma/client";
import type {PaginationRequest} from "@/types/responses";

import {apiClient} from "@/helpers/client/axios";

/**
 * Get all stacks
 *
 * @param pagination - Pagination options
 * @returns A list of stacks
 * @throws An error if the stacks could not be retrieved
 */
export async function getAllStack(pagination?: PaginationRequest): Promise<Stack[]> {
  try {
    const {data: response} = await apiClient.get<Stack[]>("/api/stack/get/all.json", {
      params: pagination,
    });

    return response ?? [];
  } catch {
    throw new Error("No se pudo obtener la lista de stacks");
  }
}
