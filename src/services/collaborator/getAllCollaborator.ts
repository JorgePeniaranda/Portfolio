import type {PaginationRequest} from "@/types/responses";
import type {Collaborator} from "@prisma/client";

import {apiClient} from "@/helpers/client/axios";
import {handleServiceError} from "@/helpers/error/service-handler";

/**
 * Get all collaborators
 *
 * @param pagination - Pagination options
 * @returns A list of collaborators
 * @throws An error if the collaborators could not be retrieved
 */
export async function getAllCollaborator(pagination?: PaginationRequest): Promise<Collaborator[]> {
  try {
    const {data: response} = await apiClient.get<Collaborator[]>("/api/collaborator.json", {
      params: pagination,
    });

    return response;
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: "No se pudo obtener la lista de colaboradores.",
    });
  }
}
