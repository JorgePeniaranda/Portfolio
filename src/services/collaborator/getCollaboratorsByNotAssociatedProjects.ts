import type {ApiResponse, PaginationRequest} from "@/types/responses";
import type {Collaborator, Project} from "@prisma/client";

import {apiClient} from "@/helpers/client/axios";

export async function getCollaboratorsByNotAssociatedProjects({
  idProject,
  pagination,
}: {
  idProject: Project["id"];
  pagination?: PaginationRequest;
}): Promise<Array<Collaborator>> {
  const {data: response} = await apiClient.get<ApiResponse<Array<Collaborator>>>(
    `api/collaborator/get/not-related/project/${idProject}`,
    {
      params: pagination,
    },
  );

  if (response.success === false) {
    throw new Error(response.message);
  }

  return response?.data ?? [];
}
