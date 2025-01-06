import type {ApiResponse} from "@/types/responses";
import type {RelationshipsSchema} from "../../schemas/common/relationships";

import {type Collaborator} from "@prisma/client";
import axios from "axios";

export async function patchAddRelationWithProjectFromCollaborator(
  data: RelationshipsSchema,
): Promise<ApiResponse<Collaborator>> {
  const {data: response} = await axios.patch<ApiResponse<Collaborator>>(
    "/api/collaborator/relations/project/add",
    data,
  );

  return response;
}
