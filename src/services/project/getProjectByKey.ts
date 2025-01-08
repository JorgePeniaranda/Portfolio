import type {ApiResponse} from "@/types/responses";
import type {Project} from "@prisma/client";

import {apiClient} from "@/helpers/client/axios";

export async function getProjectByKey({key}: {key: Project["key"]}): Promise<Project | null> {
  const {data: response} = await apiClient.get<ApiResponse<Project | null>>(
    `api/project/get/key/${key}.json`,
  );

  if (response.success === false) {
    throw new Error(response.message);
  }

  return response?.data ?? null;
}
