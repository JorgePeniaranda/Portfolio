import type {ApiResponse, PaginationRequest} from "@/types/responses";
import type {Stack} from "@prisma/client";

import {apiClient} from "@/helpers/client/axios";

export async function getStacksByAssociatedProjects({
  idProject,
  pagination,
}: {
  idProject: Stack["id"];
  pagination?: PaginationRequest;
}): Promise<Stack[]> {
  const {data: response} = await apiClient.get<ApiResponse<Array<Stack>>>(
    `api/stack/get/related/project/${idProject}`,
    {
      params: pagination,
    },
  );

  if (response.success === false) {
    throw new Error(response.message);
  }

  return response?.data ?? [];
}
