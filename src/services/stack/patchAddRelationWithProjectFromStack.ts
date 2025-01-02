import type {RelationshipsSchema} from "@/schemas/common/relationships";
import type {ApiResponse} from "@/types/responses";
import type {Stack} from "@prisma/client";

import axios from "axios";

export async function patchAddRelationWithProjectFromStack(
  data: RelationshipsSchema,
): Promise<ApiResponse<Stack>> {
  const {data: response} = await axios.patch<ApiResponse<Stack>>(
    "/api/stack/relations/project/add",
    data,
  );

  return response;
}
