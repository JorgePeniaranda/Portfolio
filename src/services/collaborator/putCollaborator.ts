import type {ApiResponse} from "../../types/responses";

import {Prisma, type Collaborator} from "@prisma/client";
import axios from "axios";

export async function putCollaborator(
  data: Prisma.CollaboratorUpdateInput,
): Promise<ApiResponse<Collaborator>> {
  const {data: response} = await axios.put<ApiResponse<Collaborator>>(
    "/api/collaborator/update",
    data,
  );

  return response;
}
