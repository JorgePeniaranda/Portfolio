import type {DeleteResponse} from "@/types/responses";

import {type Collaborator} from "@prisma/client";

import {apiClient} from "@/helpers/client/axios";
import {handleServiceError} from "@/helpers/error/service-handler";

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
    const {data: response} = await apiClient.delete<DeleteResponse>("/api/collaborator", {
      data: collaboratorIds,
    });

    return response;
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: "No se pudo eliminar el colaborador.",
    });
  }
}
