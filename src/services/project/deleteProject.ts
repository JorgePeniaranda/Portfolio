import type {DeleteResponse} from "@/types/responses";
import type {Project} from "@prisma/client";

import axios from "axios";

/**
 * Deletes a project.
 *
 * @param projectIds The project ID.
 * @returns The number of items deleted.
 * @throws An error if the operation fails.
 */
export async function deleteProject(projectIds: Project["id"][]): Promise<DeleteResponse> {
  try {
    const {data: response} = await axios.post<DeleteResponse>("/api/project/delete", projectIds);

    return response;
  } catch {
    throw new Error("No se pudo eliminar el proyecto.");
  }
}
