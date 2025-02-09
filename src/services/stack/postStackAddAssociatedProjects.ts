import type {RelationshipsSchema} from "@/schemas/common/relationships";
import type {Stack} from "@prisma/client";

import {apiClient} from "@/helpers/client/axios";
import {handleServiceError} from "@/helpers/error/service-handler";

/**
 * Add a project to a stack.
 *
 * @param relationshipSchema - Relationships schema.
 * @returns A promise with the stack data.
 * @throws An error if the project could not be added to the stack.
 */
export async function postStackAddAssociatedProjects(
  relationshipSchema: RelationshipsSchema,
): Promise<Stack> {
  try {
    const {idFrom, idTo} = relationshipSchema;
    const {data: response} = await apiClient.post<Stack>(`/api/stack/id/${idFrom}/project/${idTo}`);

    return response;
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: "No se pudo agregar el proyecto al stack.",
    });
  }
}
