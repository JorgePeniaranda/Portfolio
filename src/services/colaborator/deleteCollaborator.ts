import type {ApiResponse} from "../../types/responses";

import {type Colaborator} from "@prisma/client";
import axios from "axios";

export async function deleteCollaborator(
  data: Colaborator["id"][],
): Promise<ApiResponse<Colaborator>> {
  const {data: response} = await axios.post("/api/collaborator/delete", data);

  return response;
}
