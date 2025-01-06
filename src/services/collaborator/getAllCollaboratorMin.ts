import type {ApiResponse, PaginationRequest} from "@/types/responses";
import type {Collaborator} from "@prisma/client";

import {apiClient} from "@/helpers/client/axios";

type CollaboratorMin = Pick<Collaborator, "id" | "nickname" | "githubUsername">;

export async function getAllCollaboratorMin(
  pagination: PaginationRequest,
): Promise<CollaboratorMin[]> {
  const {data: response} = await apiClient.get<ApiResponse<Collaborator[]>>(
    "/api/collaborator/get/all-min",
    {
      params: pagination,
    },
  );

  if (response.success === false) {
    throw new Error(response.message);
  }

  return response?.data ?? [];
}
