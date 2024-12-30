import type {ApiResponse} from "../../types/responses";

import {Prisma, type Colaborator} from "@prisma/client";
import axios from "axios";

export async function postCollaborator(
  data: Prisma.ColaboratorCreateInput,
): Promise<ApiResponse<Colaborator>> {
  const {data: response} = await axios.post<ApiResponse<Colaborator>>(
    "/api/collaborator/create",
    data,
  );

  return response;
}
