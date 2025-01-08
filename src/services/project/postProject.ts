import type {ApiResponse} from "@/types/responses";

import {Prisma, type Project} from "@prisma/client";
import axios from "axios";

import {serviceErrorHandler} from "@/helpers/error/service-handler";

export async function postProject(data: Prisma.ProjectCreateInput): Promise<ApiResponse<Project>> {
  try {
    const {data: response} = await axios.post<ApiResponse<Project>>("/api/project/create", data);

    return response;
  } catch (error) {
    return {
      success: false,
      message: serviceErrorHandler(error),
    };
  }
}
