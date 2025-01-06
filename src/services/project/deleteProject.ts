import type {ApiResponse, DeleteResponse} from "@/types/responses";
import type {Project} from "@prisma/client";

import axios from "axios";

export async function deleteProject(data: Project["id"][]): Promise<ApiResponse<DeleteResponse>> {
  const {data: response} = await axios.post<ApiResponse<DeleteResponse>>(
    "/api/project/delete",
    data,
  );

  return response;
}
