import type {PaginationRequest} from "@/types/responses";
import type {Stack} from "@prisma/client";

import {apiClient} from "@/helpers/client/axios";

/**
 * Get stacks by associated projects.
 *
 * @param idProject - The project ID
 * @param pagination - Pagination options
 * @returns A list of stacks
 * @throws An error if the stacks could not be retrieved
 */
export async function getStacksByAssociatedProjects({
  idProject,
  pagination,
}: {
  idProject: Stack["id"];
  pagination?: PaginationRequest;
}): Promise<Stack[]> {
  try {
    const {data: response} = await apiClient.get<Stack[]>(
      `api/stack/get/related/project/${idProject}.json`,
      {
        params: pagination,
      },
    );

    return response ?? [];
  } catch {
    throw new Error("No se pudo obtener la lista de stacks");
  }
}
