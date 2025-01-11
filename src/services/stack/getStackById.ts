import type {Stack} from "@prisma/client";

import {apiClient} from "@/helpers/client/axios";

/**
 * Get a stack by its id.
 *
 * @param id - The id of the stack
 * @returns The stack with the given id, or null if it does not exist
 * @throws An error if the stack could not be retrieved
 */
export async function getStackById({id}: {id: Stack["id"]}): Promise<Stack | null> {
  try {
    const {data: response} = await apiClient.get<Stack | null>(`api/stack/get/id/${id}.json`);

    return response ?? null;
  } catch {
    throw new Error("No se pudo obtener el stack");
  }
}
