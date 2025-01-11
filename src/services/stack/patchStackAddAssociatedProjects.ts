import type {RelationshipsSchema} from "@/schemas/common/relationships";
import type {Stack} from "@prisma/client";

import axios from "axios";

/**
 * Add a project to a stack.
 *
 * @param relationshipSchema - Relationships schema.
 * @returns A promise with the stack data.
 * @throws An error if the project could not be added to the stack.
 */
export async function patchStackAddAssociatedProjects(
  relationshipSchema: RelationshipsSchema,
): Promise<Stack> {
  try {
    const {data: response} = await axios.patch<Stack>(
      "/api/stack/relations/project/add",
      relationshipSchema,
    );

    return response;
  } catch {
    throw new Error("No se pudo agregar el proyecto al stack.");
  }
}
