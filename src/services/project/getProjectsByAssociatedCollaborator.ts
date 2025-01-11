import type {PaginationRequest} from "@/types/responses";
import type {Collaborator, Project} from "@prisma/client";

import {apiClient} from "@/helpers/client/axios";

/**
 * Get projects by associated collaborator.
 *
 * @param idCollaborator - The collaborator ID
 * @param pagination - Pagination options
 * @returns A list of projects
 * @throws An error if the projects could not be retrieved
 */
export async function getProjectsByAssociatedCollaborator({
  idCollaborator,
  pagination,
}: {
  idCollaborator: Collaborator["id"];
  pagination?: PaginationRequest;
}): Promise<Project[]> {
  try {
    const {data: response} = await apiClient.get<Project[]>(
      `/api/project/get/related/collaborator/${idCollaborator}.json`,
      {
        params: pagination,
      },
    );

    return response ?? [];
  } catch {
    throw new Error("No se pudo obtener la lista de proyectos");
  }
}
