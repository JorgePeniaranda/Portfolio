import type {RelationshipsSchema} from "@/schemas/common/relationships";
import type {Project} from "@prisma/client";

import axios from "axios";

/**
 * Remove a collaborator from a project.
 *
 * @param relationshipSchema - Relationships schema.
 * @returns A promise with the project data.
 * @throws An error if the collaborator could not be removed from the project.
 */
export async function patchProjectRemoveAssociatedCollaborator(
  relationshipSchema: RelationshipsSchema,
): Promise<Project> {
  try {
    const {data: response} = await axios.patch<Project>(
      "/api/project/relations/collaborator/delete",
      relationshipSchema,
    );

    return response;
  } catch {
    throw new Error("No se pudo eliminar el colaborador del proyecto.");
  }
}
