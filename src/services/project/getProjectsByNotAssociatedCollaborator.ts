import type {PaginationRequest} from "@/types/responses";
import type {Collaborator, Project} from "@prisma/client";

import {apiClient} from "@/helpers/client/axios";
import {handleServiceError} from "@/helpers/error/service-handler";

/**
 * Get projects by not associated collaborator.
 *
 * @param idCollaborator - The collaborator ID
 * @param pagination - Pagination options
 * @returns A list of projects
 * @throws An error if the projects could not be retrieved
 */
export async function getProjectsByNotAssociatedCollaborator({
  idCollaborator,
  pagination,
}: {
  idCollaborator: Collaborator["id"];
  pagination?: PaginationRequest;
}): Promise<Project[]> {
  try {
    const {data: response} = await apiClient.get<Project[]>(
      `/api/project/get/not-related/collaborator/${idCollaborator}.json`,
      {
        params: pagination,
      },
    );

    return response;
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: "No se pudo obtener la lista de proyectos.",
    });
  }
}
