import type {ApiResponse, DeleteResponse} from "@/types/responses";
import type {Project} from "@prisma/client";

import axios from "axios";

import {serviceErrorHandler} from "@/helpers/error/service-handler";

export async function deleteProject(data: Project["id"][]): Promise<ApiResponse<DeleteResponse>> {
  try {
    const {data: response} = await axios.post<ApiResponse<DeleteResponse>>(
      "/api/project/delete",
      data,
    );

    return response;
  } catch (error) {
    return {
      success: false,
      message: serviceErrorHandler(error),
    };
  }
}
