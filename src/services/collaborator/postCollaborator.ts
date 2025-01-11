import {Prisma, type Collaborator} from "@prisma/client";
import axios from "axios";

/**
 * Create a new collaborator.
 *
 * @param newCollaborator - The collaborator to create.
 * @returns The created collaborator.
 * @throws An error if the operation fails.
 */
export async function postCollaborator(
  newCollaborator: Prisma.CollaboratorCreateInput,
): Promise<Collaborator> {
  try {
    const {data: response} = await axios.post<Collaborator>(
      "/api/collaborator/create",
      newCollaborator,
    );

    return response;
  } catch {
    throw new Error("No se pudo crear el colaborador.");
  }
}
