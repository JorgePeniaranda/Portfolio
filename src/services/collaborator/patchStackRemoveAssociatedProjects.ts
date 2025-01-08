import type {ApiResponse} from "@/types/responses";
import type {RelationshipsSchema} from "../../schemas/common/relationships";
import type {Collaborator} from "@prisma/client";

import axios from "axios";

import {serviceErrorHandler} from "@/helpers/error/service-handler";

export async function patchStackRemoveAssociatedProjects(
  data: RelationshipsSchema,
): Promise<ApiResponse<Collaborator>> {
  try {
    const {data: response} = await axios.patch<ApiResponse<Collaborator>>(
      "/api/collaborator/relations/project/delete",
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
