import type {RelationshipsSchema} from "../../schemas/common/relationships";
import type {ApiResponse} from "../../types/responses";

import {type Collaborator} from "@prisma/client";
import axios from "axios";

export async function patchDeleteRelationWithProjectFromCollaborator(
  data: RelationshipsSchema,
): Promise<ApiResponse<Collaborator>> {
  const {data: response} = await axios.patch<ApiResponse<Collaborator>>(
    "/api/collaborator/relations/project/delete",
    data,
  );

  return response;
}
