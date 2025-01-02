import type {ApiResponse} from "@/types/responses";

import {type Collaborator} from "@prisma/client";
import axios from "axios";

export async function deleteCollaborator(
  data: Collaborator["id"][],
): Promise<ApiResponse<Collaborator>> {
  const {data: response} = await axios.post("/api/collaborator/delete", data);

  return response;
}
