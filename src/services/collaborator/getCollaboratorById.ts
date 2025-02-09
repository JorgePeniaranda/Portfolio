import type {Collaborator} from "@prisma/client";

import {apiClient} from "@/helpers/client/axios";
import {handleServiceError} from "@/helpers/error/service-handler";

/**
 * Get a collaborator by its id.
 *
 * @param id - The id of the collaborator
 * @returns The collaborator with the given id, or null if it does not exist
 * @throws An error if the collaborator could not be retrieved
 */
export async function getCollaboratorById({
  id,
}: {
  id: Collaborator["id"];
}): Promise<Collaborator | null> {
  try {
    const {data: response} = await apiClient.get<Collaborator | null>(
      `/api/collaborator/id/${id}.json`,
    );

    return response;
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: "No se pudo obtener el colaborador.",
    });
  }
}
