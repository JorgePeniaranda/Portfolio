import type {ApiResponse, PaginationRequest} from "@/types/responses";
import type {Collaborator, Project} from "@prisma/client";

import {apiClient} from "@/helpers/client/axios";

export async function getAllProjectsRelatedWithCollaborator({
  idCollaborator,
  pagination,
}: {
  idCollaborator: Collaborator["id"];
  pagination?: PaginationRequest;
}): Promise<Project[]> {
  const {data: response} = await apiClient.get<ApiResponse<Project[]>>(
    `/api/project/get/related/collaborator/${idCollaborator}`,
    {
      params: pagination,
    },
  );

  if (response.success === false) {
    throw new Error(response.message);
  }

  return response?.data ?? [];
}
