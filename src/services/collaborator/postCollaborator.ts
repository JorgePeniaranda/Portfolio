import {Prisma, type Collaborator} from "@prisma/client";

import {apiClient} from "@/helpers/client/axios";
import {handleServiceError} from "@/helpers/error/service-handler";

/**
 * Create a new collaborator.
 *
 * @param newCollaborator - The collaborator to create.
 * @returns The created collaborator.
 * @throws An error if the operation fails.
 */
export async function postCollaborator(
  newCollaborator: Prisma.CollaboratorCreateInput,
): Promise<Collaborator> {
  try {
    const {data: response} = await apiClient.post<Collaborator>(
      "/api/collaborator/create",
      newCollaborator,
    );

    return response;
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: "No se pudo crear el colaborador.",
    });
  }
}
