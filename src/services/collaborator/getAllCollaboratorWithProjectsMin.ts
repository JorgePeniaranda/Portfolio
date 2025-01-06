import type {ApiResponse, PaginationRequest} from "@/types/responses";
import type {Collaborator, Project} from "@prisma/client";

import {apiClient} from "@/helpers/client/axios";

export type IGetAllCollaboratorWithProjectsMinResponse = Collaborator & {
  associatedProjects: Pick<Project, "id" | "name" | "logoUrl">[];
};

// TO-DO: ESTO DEBE SER UN GET ALL PROJECT MIN BY COLLABORATOR ID
export async function getAllCollaboratorWithProjectsMin(
  pagination?: PaginationRequest,
): Promise<IGetAllCollaboratorWithProjectsMinResponse[]> {
  const {data: response} = await apiClient.get<
    ApiResponse<IGetAllCollaboratorWithProjectsMinResponse[]>
  >("/api/collaborator/get/all-min", {
    params: pagination,
  });

  if (response.success === false) {
    throw new Error(response.message);
  }

  return response?.data ?? [];
}
