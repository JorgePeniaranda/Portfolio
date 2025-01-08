import type {ApiResponse, PaginationRequest} from "@/types/responses";
import type {Project} from "@prisma/client";

import {apiClient} from "@/helpers/client/axios";

export type IGetAllProjectMinResponse = Array<
  Pick<Project, "id" | "key" | "name" | "logoUrl" | "stackCategory" | "status">
>;

// NOTE-DEV: If more parameters are added, switch to an object for better clarity.
export async function getAllProjectMin(
  pagination?: PaginationRequest,
): Promise<IGetAllProjectMinResponse> {
  const {data: response} = await apiClient.get<ApiResponse<IGetAllProjectMinResponse>>(
    "/api/project/get/min/all.json",
    {
      params: pagination,
    },
  );

  if (response.success === false) {
    throw new Error(response.message);
  }

  return response?.data ?? [];
}
