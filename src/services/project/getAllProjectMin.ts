import type {PaginationRequest} from "@/types/responses";
import type {Project} from "@prisma/client";

import {apiClient} from "@/helpers/client/axios";
import {handleServiceError} from "@/helpers/error/service-handler";

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

    return response;
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: "No se pudo obtener la lista de proyectos.",
    });
  }
}
