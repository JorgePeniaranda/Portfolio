import type {ApiResponse} from "@/types/responses";

import {Prisma, type Collaborator} from "@prisma/client";
import axios from "axios";

import {serviceErrorHandler} from "@/helpers/error/service-handler";

export async function postCollaborator(
  data: Prisma.CollaboratorCreateInput,
): Promise<ApiResponse<Collaborator>> {
  try {
    const {data: response} = await axios.post<ApiResponse<Collaborator>>(
      "/api/collaborator/create",
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
