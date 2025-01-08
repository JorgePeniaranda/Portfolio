import type {ApiResponse, PaginationRequest} from "@/types/responses";
import type {Collaborator} from "@prisma/client";

import {apiClient} from "@/helpers/client/axios";

// NOTE-DEV: If more parameters are added, switch to an object for better clarity.
export async function getAllCollaborator(pagination?: PaginationRequest): Promise<Collaborator[]> {
  const {data: response} = await apiClient.get<ApiResponse<Collaborator[]>>(
    "/api/collaborator/get/all.json",
    {
      params: pagination,
    },
  );

  if (response.success === false) {
    throw new Error(response.message);
  }

  return response?.data ?? [];
}
