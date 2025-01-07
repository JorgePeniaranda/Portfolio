import type {Project} from "@prisma/client";
import type {ApiResponse} from "@/types/responses";

import {apiClient} from "@/helpers/client/axios";

export async function getProjectById({id}: {id: Project["id"]}): Promise<Project | null> {
  const {data: response} = await apiClient.get<ApiResponse<Project | null>>(
    `api/project/get/${id}`,
  );

  if (response.success === false) {
    throw new Error(response.message);
  }

  return response?.data ?? null;
}
