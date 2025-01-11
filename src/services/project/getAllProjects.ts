import type {PaginationRequest} from "@/types/responses";
import type {Project} from "@prisma/client";

import {apiClient} from "@/helpers/client/axios";
import {handleServiceError} from "@/helpers/error/service-handler";

/**
 * Get all projects
 *
 * @param pagination - Pagination options
 * @returns A list of projects
 * @throws An error if the projects could not be retrieved
 */
export async function getAllProjects(pagination?: PaginationRequest): Promise<Project[]> {
  try {
    const {data: response} = await apiClient.get<Project[]>("/api/project/get/all.json", {
      params: pagination,
    });

    return response ?? [];
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: "No se pudo obtener la lista de proyectos.",
    });
  }
}
