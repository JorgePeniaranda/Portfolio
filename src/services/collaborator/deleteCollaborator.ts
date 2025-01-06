import type {ApiResponse, DeleteResponse} from "@/types/responses";

import {type Collaborator} from "@prisma/client";
import axios from "axios";

export async function deleteCollaborator(
  data: Collaborator["id"][],
): Promise<ApiResponse<DeleteResponse>> {
  const {data: response} = await axios.post<ApiResponse<DeleteResponse>>(
    "/api/collaborator/delete",
    data,
  );

  return response;
}
