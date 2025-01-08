import type {ApiResponse} from "@/types/responses";

import {Prisma, type Project} from "@prisma/client";
import axios from "axios";

import {serviceErrorHandler} from "@/helpers/error/service-handler";

export async function putProject(data: Prisma.ProjectUpdateInput): Promise<ApiResponse<Project>> {
  try {
    const {data: response} = await axios.put<ApiResponse<Project>>("/api/project/update", data);

    return response;
  } catch (error) {
    return {
      success: false,
      message: serviceErrorHandler(error),
    };
  }
}
