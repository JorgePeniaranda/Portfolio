import type {RelationshipsSchema} from "@/schemas/common/relationships";
import type {Project} from "@prisma/client";

import {apiClient} from "@/helpers/client/axios";
import {handleServiceError} from "@/helpers/error/service-handler";

/**
 * Remove a collaborator from a project.
 *
 * @param relationshipSchema - Relationships schema.
 * @returns A promise with the project data.
 * @throws An error if the collaborator could not be removed from the project.
 */
export async function deleteProjectRemoveAssociatedCollaborator(
  relationshipSchema: RelationshipsSchema,
): Promise<Project> {
  try {
    const {idFrom, idTo} = relationshipSchema;
    const {data: response} = await apiClient.delete<Project>(
      `/api/project/id/${idFrom}/collaborator/${idTo}`,
    );

    return response;
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: "No se pudo eliminar el colaborador del proyecto.",
    });
  }
}
