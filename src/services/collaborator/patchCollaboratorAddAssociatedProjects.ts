import type {RelationshipsSchema} from "../../schemas/common/relationships";

import {handleServiceError} from "@/helpers/error/service-handler";
import {apiClient} from "@/helpers/client/axios";

/**
 * This service is responsible for adding a project to a collaborator.
 *
 * @param relationSchema - Object with the collaborator and project data.
 * @returns A promise with the collaborator and project data.
 * @throws An error if the collaborator and project data could not be added.
 */
export async function patchCollaboratorAddAssociatedProjects(
  relationSchema: RelationshipsSchema,
): Promise<void> {
  try {
    const {data: response} = await apiClient.patch<void>(
      "/api/collaborator/relations/project/add",
      relationSchema,
    );

    return response;
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: "No se pudo agregar el proyecto al colaborador.",
    });
  }
}
