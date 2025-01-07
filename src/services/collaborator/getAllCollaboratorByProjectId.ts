import type {ApiResponse, PaginationRequest} from "@/types/responses";
import type {Collaborator, Stack} from "@prisma/client";

import {apiClient} from "@/helpers/client/axios";

export async function getAllCollaboratorByProjectId({
  idProject,
  pagination,
}: {
  idProject: Stack["id"];
  pagination?: PaginationRequest;
}): Promise<Collaborator[]> {
  const {data: response} = await apiClient.get<ApiResponse<Collaborator[]>>(
    `api/collaborator/get/related/project/${idProject}`,
    {
      params: pagination,
    },
  );

  if (response.success === false) {
    throw new Error(response.message);
  }

  return response?.data ?? [];
}
