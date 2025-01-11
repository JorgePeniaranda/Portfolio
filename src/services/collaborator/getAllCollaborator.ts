import type {PaginationRequest} from "@/types/responses";
import type {Collaborator} from "@prisma/client";

import {apiClient} from "@/helpers/client/axios";

/**
 * Get all collaborators
 *
 * @param pagination - Pagination options
 * @returns A list of collaborators
 * @throws An error if the collaborators could not be retrieved
 */
export async function getAllCollaborator(pagination?: PaginationRequest): Promise<Collaborator[]> {
  try {
    const {data: response} = await apiClient.get<Collaborator[]>("/api/collaborator/get/all.json", {
      params: pagination,
    });

    return response ?? [];
  } catch {
    throw new Error("No se pudo obtener la lista de colaboradores");
  }
}
