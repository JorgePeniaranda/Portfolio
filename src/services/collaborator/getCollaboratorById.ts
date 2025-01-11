import type {Collaborator} from "@prisma/client";

import {apiClient} from "@/helpers/client/axios";

/**
 * Get a collaborator by its id.
 *
 * @param id - The id of the collaborator
 * @returns The collaborator with the given id, or null if it does not exist
 * @throws An error if the collaborator could not be retrieved
 */
export async function getCollaboratorById({
  id,
}: {
  id: Collaborator["id"];
}): Promise<Collaborator | null> {
  try {
    const {data: response} = await apiClient.get<Collaborator | null>(
      `api/collaborator/get/id/${id}.json`,
    );

    return response ?? null;
  } catch {
    throw new Error("No se pudo obtener la lista de colaboradores");
  }
}
