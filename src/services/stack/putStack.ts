import {Prisma, type Stack} from "@prisma/client";
import axios from "axios";

/**
 * Update a stack
 *
 * @param stackUpdateInput - Stack data
 * @returns Stack data
 * @throws An error if the stack could not be updated
 */
export async function putStack(stackUpdateInput: Prisma.StackUpdateInput): Promise<Stack> {
  try {
    const {data: response} = await axios.put<Stack>("/api/stack/update", stackUpdateInput);

    return response;
  } catch {
    throw new Error("No se pudo actualizar el stack.");
  }
}
