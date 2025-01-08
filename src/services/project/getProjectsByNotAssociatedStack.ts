import type {ApiResponse, PaginationRequest} from "@/types/responses";
import type {Collaborator, Project} from "@prisma/client";

import {apiClient} from "@/helpers/client/axios";

export async function getProjectsByNotAssociatedStack({
  idStack,
  pagination,
}: {
  idStack: Collaborator["id"];
  pagination?: PaginationRequest;
}): Promise<Array<Project>> {
  const {data: response} = await apiClient.get<ApiResponse<Project[]>>(
    `/api/project/get/not-related/stack/${idStack}`,
    {
      params: pagination,
    },
  );

  if (response.success === false) {
    throw new Error(response.message);
  }

  return response?.data ?? [];
}
