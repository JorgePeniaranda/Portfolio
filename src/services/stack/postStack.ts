import {Prisma, type Stack} from "@prisma/client";
import axios from "axios";

/**
 * Create a new stack.
 *
 * @param stackUpdateInput - The stack data.
 * @returns The created stack.
 * @throws An error if the operation fails.
 */
export async function postStack(stackUpdateInput: Prisma.StackUpdateInput): Promise<Stack> {
  try {
    const {data: response} = await axios.post<Stack>("/api/stack/create", stackUpdateInput);

    return response;
  } catch {
    throw new Error("No se pudo crear el stack.");
  }
}
