import type {RelationshipsSchema} from "../../schemas/common/relationships";

import axios from "axios";

import {handleServiceError} from "@/helpers/error/service-handler";

/**
 * This service is responsible for removing a project from a collaborator.
 *
 * @param relationSchema - Object with the collaborator and project data.
 * @returns A promise with the collaborator and project data.
 * @throws An error if the collaborator and project data could not be removed.
 */
export async function patchCollaboratorRemoveAssociatedProjects(
  relationSchema: RelationshipsSchema,
): Promise<void> {
  try {
    const {data: response} = await axios.patch<void>(
      "/api/collaborator/relations/project/delete",
      relationSchema,
    );

    return response;
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: "No se pudo eliminar el proyecto del colaborador.",
    });
  }
}
