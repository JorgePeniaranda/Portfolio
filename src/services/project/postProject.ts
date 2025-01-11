import {Prisma, type Project} from "@prisma/client";
import axios from "axios";

/**
 * Create a new project.
 *
 * @param projectInput - The project data.
 * @returns The created project.
 * @throws An error if the operation fails.
 */
export async function postProject(projectInput: Prisma.ProjectCreateInput): Promise<Project> {
  try {
    const {data: response} = await axios.post<Project>("/api/project/create", projectInput);

    return response;
  } catch {
    throw new Error("No se pudo crear el proyecto");
  }
}
