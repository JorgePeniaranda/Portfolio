import {Prisma, type Collaborator} from "@prisma/client";

import {apiClient} from "@/helpers/client/axios";
import {handleServiceError} from "@/helpers/error/service-handler";

/**
 * Update a collaborator.
 *
 * @param updatedCollaborator - The collaborator to update.
 * @returns The updated collaborator.
 * @throws An error if the operation fails.
 */
export async function putCollaborator(
  updatedCollaborator: Prisma.CollaboratorUpdateInput,
): Promise<Collaborator> {
  try {
    const {data: response} = await apiClient.put<Collaborator>(
      "/api/collaborator/update",
      updatedCollaborator,
    );

    return response;
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: "No se pudo actualizar el colaborador.",
    });
  }
}
