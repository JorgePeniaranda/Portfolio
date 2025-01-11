import type {Stack} from "@prisma/client";

import {apiClient} from "@/helpers/client/axios";

/**
 * Get a stack by its key.
 *
 * @param key - The key of the stack
 * @returns The stack with the given key, or null if it does not exist
 * @throws An error if the stack could not be retrieved
 */
export async function getStackByKey({key}: {key: Stack["key"]}): Promise<Stack | null> {
  try {
    const {data: response} = await apiClient.get<Stack | null>(`api/stack/get/key/${key}.json`);

    return response ?? null;
  } catch {
    throw new Error("No se pudo obtener el stack");
  }
}
