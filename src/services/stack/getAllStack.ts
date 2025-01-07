import type {Stack} from "@prisma/client";
import type {ApiResponse, PaginationRequest} from "@/types/responses";

import {apiClient} from "@/helpers/client/axios";

export async function getAllStack(pagination?: PaginationRequest): Promise<Stack[]> {
  const {data: response} = await apiClient.get<ApiResponse<Stack[]>>("/api/stack/get/all", {
    params: pagination,
  });

  if (response.success === false) {
    throw new Error(response.message);
  }

  return response?.data ?? [];
}
