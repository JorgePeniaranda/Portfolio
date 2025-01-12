import type {Project} from "@prisma/client";

import {apiClient} from "@/helpers/client/axios";
import {handleServiceError} from "@/helpers/error/service-handler";

/**
 * Get a project by its key.
 *
 * @param key - The key of the project
 * @returns The project with the given key, or null if it does not exist
 * @throws An error if the project could not be retrieved
 */
export async function getProjectByKey({key}: {key: Project["key"]}): Promise<Project | null> {
  try {
    const {data: response} = await apiClient.get<Project | null>(`api/project/get/key/${key}.json`);

    return response ?? null;
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: "No se pudo obtener el proyecto.",
    });
  }
}
