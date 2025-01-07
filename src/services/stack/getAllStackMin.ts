import type {ApiResponse, PaginationRequest} from "@/types/responses";
import type {Stack} from "@prisma/client";

import {apiClient} from "@/helpers/client/axios";

export type IGetAllStackMin = Array<Pick<Stack, "id" | "name" | "iconUrl">>;

export async function getAllStackMin(pagination?: PaginationRequest): Promise<IGetAllStackMin> {
  const {data: response} = await apiClient.get<ApiResponse<IGetAllStackMin>>(
    "/api/collaborator/get/min/all",
    {
      params: pagination,
    },
  );

  if (response.success === false) {
    throw new Error(response.message);
  }

  return response?.data ?? [];
}
