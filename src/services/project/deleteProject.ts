import type {ApiResponse} from "../../types/responses";

import {type Project} from "@prisma/client";
import axios from "axios";

export async function deleteProject(data: Project["id"][]): Promise<ApiResponse<Project>> {
  const {data: response} = await axios.post("/api/project/delete", data);

  return response;
}
