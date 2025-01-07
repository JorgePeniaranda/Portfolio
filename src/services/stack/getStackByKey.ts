import type {ApiResponse} from "@/types/responses";
import type {Stack} from "@prisma/client";

import {apiClient} from "@/helpers/client/axios";

export async function getStackByKey({key}: {key: Stack["key"]}): Promise<Stack | null> {
  const {data: response} = await apiClient.get<ApiResponse<Stack | null>>(
    `api/projcets/get/key/${key}`,
  );

  if (response.success === false) {
    throw new Error(response.message);
  }

  return response?.data ?? null;
}
