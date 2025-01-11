import type {PaginationRequest} from "@/types/responses";
import type {Collaborator, Project} from "@prisma/client";

import {apiClient} from "@/helpers/client/axios";

/**
 * Get collaborators by not associated projects.
 *
 * @param idProject - The project ID
 * @param pagination - Pagination options
 * @returns A list of collaborators
 * @throws An error if the collaborators could not be retrieved
 */
export async function getCollaboratorsByNotAssociatedProjects({
  idProject,
  pagination,
}: {
  idProject: Project["id"];
  pagination?: PaginationRequest;
}): Promise<Array<Collaborator>> {
  try {
    const {data: response} = await apiClient.get<Collaborator[]>(
      `api/collaborator/get/not-related/project/${idProject}.json`,
      {
        params: pagination,
      },
    );

    return response ?? [];
  } catch {
    throw new Error("No se pudo obtener la lista de colaboradores");
  }
}
