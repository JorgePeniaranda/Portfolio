import type {ApiResponse} from "@/types/responses";
import type {Collaborator} from "@prisma/client";

import {apiClient} from "@/helpers/client/axios";

export async function getCollaboratorById({
  id,
}: {
  id: Collaborator["id"];
}): Promise<Collaborator | null> {
  const {data: response} = await apiClient.get<ApiResponse<Collaborator | null>>(
    `api/collaborator/get/not-related/project/${id}`,
  );

  if (response.success === false) {
    throw new Error(response.message);
  }

  return response?.data ?? null;
}
