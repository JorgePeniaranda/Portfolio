import {Prisma, type Project} from "@prisma/client";

import {apiClient} from "@/helpers/client/axios";
import {handleServiceError} from "@/helpers/error/service-handler";

/**
 * Updates a project.
 *
 * @param projectUpdateInput - The project data.
 * @returns The updated project.
 * @throws An error if the operation fails.
 */
export async function putProject({
  idProject,
  projectUpdateInput,
}: {
  idProject: Project["id"];
  projectUpdateInput: Prisma.ProjectUpdateInput;
}): Promise<Project> {
  try {
    const {data: response} = await apiClient.put<Project>(
      `/api/project/id/${idProject}`,
      projectUpdateInput,
    );

    return response;
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: "No se pudo actualizar el proyecto.",
    });
  }
}
