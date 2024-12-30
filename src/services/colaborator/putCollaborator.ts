import type {ApiResponse} from "../../types/responses";

import {Prisma, type Colaborator} from "@prisma/client";
import axios from "axios";

export async function putCollaborator(
  data: Prisma.ColaboratorUpdateInput,
): Promise<ApiResponse<Colaborator>> {
  const {data: response} = await axios.put<ApiResponse<Colaborator>>(
    "/api/collaborator/update",
    data,
  );

  return response;
}
