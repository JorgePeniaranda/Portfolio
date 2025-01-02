import type {ApiResponse} from "@/types/responses";

import {Prisma, type Collaborator} from "@prisma/client";
import axios from "axios";

export async function postCollaborator(
  data: Prisma.CollaboratorCreateInput,
): Promise<ApiResponse<Collaborator>> {
  const {data: response} = await axios.post<ApiResponse<Collaborator>>(
    "/api/collaborator/create",
    data,
  );

  return response;
}
