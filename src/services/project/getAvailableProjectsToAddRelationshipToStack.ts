import type {Project, Stack} from "@prisma/client";
import type {ApiResponse, PaginationRequest} from "@/types/responses";

import {apiClient} from "@/helpers/client/axios";

export async function getAvailableProjectsToAddRelationshipToStack({
  idStack,
  pagination,
}: {
  idStack: Stack["id"];
  pagination?: PaginationRequest;
}): Promise<Array<Project>> {
  const {data: response} = await apiClient.get<ApiResponse<Project[]>>(
    `/api/project/get/related/collaborator/${idStack}`,
    {
      params: pagination,
    },
  );

  if (response.success === false) {
    throw new Error(response.message);
  }

  return response?.data ?? [];
}
