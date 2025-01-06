import type {ApiResponse, PaginationRequest} from "@/types/responses";
import type {Collaborator} from "@prisma/client";

import {apiClient} from "@/helpers/client/axios";

export type IGetAllCollaboratorMinResponse = Pick<
  Collaborator,
  "id" | "nickname" | "githubUsername"
>;

export async function getAllCollaboratorMin(
  pagination?: PaginationRequest,
): Promise<IGetAllCollaboratorMinResponse[]> {
  const {data: response} = await apiClient.get<ApiResponse<Collaborator[]>>(
    "/api/collaborator/get/min/all",
    {
      params: pagination,
    },
  );

  if (response.success === false) {
    throw new Error(response.message);
  }

  return response?.data ?? [];
}
