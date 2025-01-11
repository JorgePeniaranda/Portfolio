import type {RelationshipsSchema} from "@/schemas/common/relationships";
import type {ApiResponse} from "@/types/responses";
import type {Stack} from "@prisma/client";

import axios from "axios";

import {serviceErrorHandler} from "@/helpers/error/service-handler";

export async function patchStackAddAssociatedProjects(
  data: RelationshipsSchema,
): Promise<ApiResponse<Stack>> {
  try {
    const {data: response} = await axios.patch<ApiResponse<Stack>>(
      "/api/stack/relations/project/add",
      data,
    );

    return response;
  } catch (error) {
    return {
      success: false,
      message: serviceErrorHandler(error),
    };
  }
}
