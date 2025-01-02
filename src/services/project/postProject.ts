import type {ApiResponse} from "@/types/responses";

import {Prisma, type Project} from "@prisma/client";
import axios from "axios";

export async function postProject(data: Prisma.ProjectCreateInput): Promise<ApiResponse<Project>> {
  const {data: response} = await axios.post<ApiResponse<Project>>("/api/project/create", data);

  return response;
}
