import {Prisma, type Project} from "@prisma/client";
import axios from "axios";

import {handleServiceError} from "@/helpers/error/service-handler";

/**
 * Updates a project.
 *
 * @param projectUpdateInput - The project data.
 * @returns The updated project.
 * @throws An error if the operation fails.
 */
export async function putProject(projectUpdateInput: Prisma.ProjectUpdateInput): Promise<Project> {
  try {
    const {data: response} = await axios.put<Project>("/api/project/update", projectUpdateInput);

    return response;
  } catch (error) {
    throw handleServiceError({
      error,
      defaultErrorMessage: "No se pudo actualizar el proyecto.",
    });
  }
}
