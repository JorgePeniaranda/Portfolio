import type {DeleteResponse} from "@/types/responses";
import type {Project} from "@prisma/client";

import {apiClient} from "@/helpers/client/axios";
import {handleServiceError} from "@/helpers/error/service-handler";

/**
 * Deletes a project.
 *
 * @param projectIds The project ID.
 * @returns The number of items deleted.
 * @throws An error if the operation fails.
 */
export async function deleteProject(projectIds: Project["id"][]): Promise<DeleteResponse> {
  try {
    const {data: response} = await apiClient.post<DeleteResponse>(
      "/api/project/delete",
      projectIds,
    );

    return response;
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: "No se pudo eliminar el proyecto.",
    });
  }
}
