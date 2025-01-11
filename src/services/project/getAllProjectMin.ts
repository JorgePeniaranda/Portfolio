import type {PaginationRequest} from "@/types/responses";
import type {Project} from "@prisma/client";

import {apiClient} from "@/helpers/client/axios";

export type IGetAllProjectMinResponse = Array<
  Pick<Project, "id" | "key" | "name" | "logoUrl" | "stackCategory" | "status">
>;

/**
 * Get all projects with minimal information.
 *
 * @param pagination - Pagination options
 * @returns A list of projects
 * @throws An error if the projects could not be retrieved
 */
export async function getAllProjectMin(
  pagination?: PaginationRequest,
): Promise<IGetAllProjectMinResponse> {
  try {
    const {data: response} = await apiClient.get<IGetAllProjectMinResponse>(
      "/api/project/get/min/all.json",
      {
        params: pagination,
      },
    );

    return response ?? [];
  } catch {
    throw new Error("No se pudo obtener la lista de proyectos");
  }
}
