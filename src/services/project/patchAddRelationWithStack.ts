import type {RelationshipsSchema} from "../../schemas/common/relationships";
import type {ApiResponse} from "../../types/responses";

import {type Project} from "@prisma/client";
import axios from "axios";

export async function patchAddRelationWithStack(
  data: RelationshipsSchema,
): Promise<ApiResponse<Project>> {
  const {data: response} = await axios.patch<ApiResponse<Project>>(
    "/api/project/relations/stack/add",
    data,
  );

  return response;
}
