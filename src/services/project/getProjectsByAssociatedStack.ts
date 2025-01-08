import type {ApiResponse, PaginationRequest} from "@/types/responses";
import type {Project, Stack} from "@prisma/client";

import {apiClient} from "@/helpers/client/axios";

export async function getProjectsByAssociatedStack({
  idStack,
  pagination,
}: {
  idStack: Stack["id"];
  pagination?: PaginationRequest;
}): Promise<Project[]> {
  const {data: response} = await apiClient.get<ApiResponse<Project[]>>(
    `/api/project/get/related/stack/${idStack}.json`,
    {
      params: pagination,
    },
  );

  if (response.success === false) {
    throw new Error(response.message);
  }

  return response?.data ?? [];
}
