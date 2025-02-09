import type {RelationshipsSchema} from "@/schemas/common/relationships";
import type {Project} from "@prisma/client";

import {apiClient} from "@/helpers/client/axios";
import {handleServiceError} from "@/helpers/error/service-handler";

/**
 * Add a stack to a project.
 *
 * @param relationshipSchema - Relationships schema.
 * @returns A promise with the project data.
 * @throws An error if the stack could not be added to the project.
 */
export async function patchProjectAddAssociatedStack(
  relationshipSchema: RelationshipsSchema,
): Promise<Project> {
  try {
    const {idFrom, idTo} = relationshipSchema;
    const {data: response} = await apiClient.post<Project>(
      `/api/project/id/${idFrom}/stack/${idTo}`,
    );

    return response;
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: "No se pudo agregar el stack al proyecto.",
    });
  }
}
