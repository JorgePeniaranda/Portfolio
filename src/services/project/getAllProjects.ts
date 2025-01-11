import type {PaginationRequest} from "@/types/responses";
import type {Project} from "@prisma/client";

import {apiClient} from "@/helpers/client/axios";

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
  } catch {
    throw new Error("No se pudo obtener la lista de proyectos");
  }
}
