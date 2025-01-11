import type {RelationshipsSchema} from "@/schemas/common/relationships";
import type {Stack} from "@prisma/client";

import axios from "axios";

/**
 * Remove a project from a stack.
 *
 * @param relationshipSchema - Relationships schema.
 * @returns A promise with the stack data.
 * @throws An error if the project could not be removed from the stack.
 */
export async function patchStackRemoveAssociatedProjects(
  relationshipSchema: RelationshipsSchema,
): Promise<Stack> {
  try {
    const {data: response} = await axios.patch<Stack>(
      "/api/stack/relations/project/delete",
      relationshipSchema,
    );

    return response;
  } catch {
    throw new Error("No se pudo eliminar el proyecto del stack.");
  }
}
