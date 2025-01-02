import type {ApiResponse} from "@/types/responses";

import {Prisma, type Project} from "@prisma/client";
import axios from "axios";

export async function putProject(data: Prisma.ProjectUpdateInput): Promise<ApiResponse<Project>> {
  const {data: response} = await axios.put<ApiResponse<Project>>("/api/project/update", data);

  return response;
}
