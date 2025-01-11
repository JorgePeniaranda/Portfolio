import type {PaginationRequest} from "@/types/responses";
import type {Collaborator, Project} from "@prisma/client";

import {apiClient} from "@/helpers/client/axios";
import {handleServiceError} from "@/helpers/error/service-handler";

/**
 * Get projects by not associated stack.
 *
 * @param idStack - The stack ID
 * @param pagination - Pagination options
 * @returns A list of projects
 * @throws An error if the projects could not be retrieved
 */
export async function getProjectsByNotAssociatedStack({
  idStack,
  pagination,
}: {
  idStack: Collaborator["id"];
  pagination?: PaginationRequest;
}): Promise<Project[]> {
  try {
    const {data: response} = await apiClient.get<Project[]>(
      `/api/project/get/not-related/stack/${idStack}.json`,
      {
        params: pagination,
      },
    );

    return response ?? [];
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: "No se pudo obtener la lista de proyectos.",
    });
  }
}
