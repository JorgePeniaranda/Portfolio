import type {RelationshipsSchema} from "@/schemas/common/relationships";
import type {Project} from "@prisma/client";

import axios from "axios";

/**
 * Remove a stack from a project.
 *
 * @param relationshipSchema - Relationships schema.
 * @returns A promise with the project data.
 * @throws An error if the stack could not be removed from the project.
 */
export async function patchProjectRemoveAssociatedStack(
  relationshipSchema: RelationshipsSchema,
): Promise<Project> {
  try {
    const {data: response} = await axios.patch<Project>(
      "/api/project/relations/stack/delete",
      relationshipSchema,
    );

    return response;
  } catch {
    throw new Error("No se pudo eliminar el stack del proyecto.");
  }
}
