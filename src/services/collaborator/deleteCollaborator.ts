import type {DeleteResponse} from "@/types/responses";

import {type Collaborator} from "@prisma/client";
import axios from "axios";

/**
 * Deletes a list of collaborators from the database.
 *
 * @param {Array<Collaborator["id"]>} collaboratorIds - An array of collaborator IDs to delete.
 * @returns {Promise<DeleteResponse>} The number of items deleted.
 * @throws {Error} A generic error message if the operation fails.
 */
export async function deleteCollaborator(
  collaboratorIds: Array<Collaborator["id"]>,
): Promise<DeleteResponse> {
  try {
    const {data: response} = await axios.post<DeleteResponse>(
      "/api/collaborator/delete",
      collaboratorIds,
    );

    return response;
  } catch {
    throw new Error("No se pudo eliminar el colaborador.");
  }
}
