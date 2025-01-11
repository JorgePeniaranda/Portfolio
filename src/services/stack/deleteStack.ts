import type {DeleteResponse} from "@/types/responses";
import type {Stack} from "@prisma/client";

import axios from "axios";

/**
 * Delete a stack.
 *
 * @param stackIds - Stack ID.
 * @returns A promise with the delete response.
 * @throws An error if the stack could not be deleted.
 */
export async function deleteStack(stackIds: Stack["id"][]): Promise<DeleteResponse> {
  try {
    const {data: response} = await axios.post<DeleteResponse>("/api/stack/delete", stackIds);

    return response;
  } catch {
    throw new Error("No se pudo eliminar el stack.");
  }
}
