import {Prisma, type Collaborator} from "@prisma/client";
import axios from "axios";

/**
 * Update a collaborator.
 *
 * @param updatedCollaborator - The collaborator to update.
 * @returns The updated collaborator.
 * @throws An error if the operation fails.
 */
export async function putCollaborator(
  updatedCollaborator: Prisma.CollaboratorUpdateInput,
): Promise<Collaborator> {
  try {
    const {data: response} = await axios.put<Collaborator>(
      "/api/collaborator/update",
      updatedCollaborator,
    );

    return response;
  } catch {
    throw new Error("No se pudo actualizar el colaborador.");
  }
}
