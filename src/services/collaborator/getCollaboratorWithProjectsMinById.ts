import type {ApiResponse, PaginationRequest} from "@/types/responses";
import type {Collaborator, Project} from "@prisma/client";

import {apiClient} from "@/helpers/client/axios";

export type IGetCollaboratorWithProjectsMinByIdResponse =
  | (Collaborator & {
      associatedProjects: Pick<Project, "id" | "name" | "logoUrl">[];
    })
  | null;

export async function getCollaboratorWithProjectsMinById({
  id,
  pagination,
}: {
  id: Collaborator["id"];
  pagination?: PaginationRequest;
}): Promise<IGetCollaboratorWithProjectsMinByIdResponse> {
  const {data: response} = await apiClient.get<
    ApiResponse<IGetCollaboratorWithProjectsMinByIdResponse>
  >(`/api/collaborator/get/min/${id}`, {
    params: pagination,
  });

  if (response.success === false) {
    throw new Error(response.message);
  }

  return response?.data ?? null;
}
