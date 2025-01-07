import type {ApiResponse, PaginationRequest} from "@/types/responses";
import type {Project} from "@prisma/client";

import {apiClient} from "@/helpers/client/axios";

export async function getAllProjects(pagination?: PaginationRequest): Promise<Project[]> {
  const {data: response} = await apiClient.get<ApiResponse<Project[]>>("/api/project/get/all", {
    params: pagination,
  });

  if (response.success === false) {
    throw new Error(response.message);
  }

  return response?.data ?? [];
}
