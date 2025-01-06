import type {ApiResponse, PaginationRequest} from "@/types/responses";
import type {Collaborator, Project} from "@prisma/client";

import {apiClient} from "@/helpers/client/axios";

export async function getCollaboratorsMinNotAssociatedWithProject({
  idProject,
  pagination,
}: {
  idProject: Project["id"];
  pagination?: PaginationRequest;
}): Promise<Pick<Collaborator, "id" | "nickname" | "githubUsername">[]> {
  const {data: response} = await apiClient.get<ApiResponse<Collaborator[]>>(
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
