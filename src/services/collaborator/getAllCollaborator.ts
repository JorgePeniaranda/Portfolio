import type {ApiResponse, PaginationRequest} from "@/types/responses";
import type {Collaborator} from "@prisma/client";

import {apiClient} from "@/helpers/client/axios";

export async function getAllCollaborator(pagination?: PaginationRequest): Promise<Collaborator[]> {
  const {data: response} = await apiClient.get<ApiResponse<Collaborator[]>>(
    "/api/collaborator/get/all",
    {
      params: pagination,
    },
  );

  if (response.success === false) {
    throw new Error(response.message);
  }

  return response?.data ?? [];
}
