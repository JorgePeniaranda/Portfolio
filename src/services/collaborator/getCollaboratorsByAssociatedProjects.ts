import type {PaginationRequest} from "@/types/responses";
import type {Collaborator, Stack} from "@prisma/client";

import {apiClient} from "@/helpers/client/axios";

/**
 * Get collaborators by associated projects.
 *
 * @param idProject - The project ID
 * @param pagination - Pagination options
 * @returns A list of collaborators
 * @throws An error if the collaborators could not be retrieved
 */
export async function getCollaboratorsByAssociatedProjects({
  idProject,
  pagination,
}: {
  idProject: Stack["id"];
  pagination?: PaginationRequest;
}): Promise<Collaborator[]> {
  try {
    const {data: response} = await apiClient.get<Collaborator[]>(
      `api/collaborator/get/related/project/${idProject}.json`,
      {
        params: pagination,
      },
    );

    return response ?? [];
  } catch {
    throw new Error("No se pudo obtener la lista de colaboradores");
  }
}
