import type {RelationshipsSchema} from "../../schemas/common/relationships";
import type {ApiResponse} from "../../types/responses";

import {type Stack} from "@prisma/client";
import axios from "axios";

export async function patchDeleteRelationWithProjectFromStack(
  data: RelationshipsSchema,
): Promise<ApiResponse<Stack>> {
  const {data: response} = await axios.patch<ApiResponse<Stack>>(
    "/api/stack/relations/project/delete",
    data,
  );

  return response;
}
