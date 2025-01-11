import type {RelationshipsSchema} from "@/schemas/common/relationships";
import type {Project} from "@prisma/client";

import axios from "axios";

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
    const {data: response} = await axios.patch<Project>(
      "/api/project/relations/stack/add",
      relationshipSchema,
    );

    return response;
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: "No se pudo agregar el stack al proyecto.",
    });
  }
}
