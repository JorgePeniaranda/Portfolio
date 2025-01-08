import type {RelationshipsSchema} from "@/schemas/common/relationships";
import type {ApiResponse} from "@/types/responses";
import type {Project} from "@prisma/client";

import axios from "axios";

import {serviceErrorHandler} from "@/helpers/error/service-handler";

export async function patchProjectAddAssociatedCollaborator(
  data: RelationshipsSchema,
): Promise<ApiResponse<Project>> {
  try {
    const {data: response} = await axios.patch<ApiResponse<Project>>(
      "/api/project/relations/collaborator/add",
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
