import type {RelationshipsSchema} from "@/schemas/common/relationships";
import type {Project} from "@prisma/client";

import axios from "axios";

/**
 * Add a collaborator to a project.
 *
 * @param relationshipSchema - Relationships schema.
 * @returns A promise with the project data.
 * @throws An error if the collaborator could not be added to the project.
 */
export async function patchProjectAddAssociatedCollaborator(
  relationshipSchema: RelationshipsSchema,
): Promise<Project> {
  try {
    const {data: response} = await axios.patch<Project>(
      "/api/project/relations/collaborator/add",
      relationshipSchema,
    );

    return response;
  } catch {
    throw new Error("No se pudo agregar el colaborador al proyecto.");
  }
}
