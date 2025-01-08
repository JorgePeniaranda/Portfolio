import type {ApiResponse, PaginationRequest} from "@/types/responses";
import type {Project, Stack} from "@prisma/client";

import {apiClient} from "@/helpers/client/axios";

export async function getStacksByNotAssociatedProjects({
  idProject,
  pagination,
}: {
  idProject: Project["id"];
  pagination?: PaginationRequest;
}): Promise<Stack[]> {
  const {data: response} = await apiClient.get<ApiResponse<Array<Stack>>>(
    `api/stack/get/not-related/project/${idProject}`,
    {
      params: pagination,
    },
  );

  if (response.success === false) {
    throw new Error(response.message);
  }

  return response?.data ?? [];
}
