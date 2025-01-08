import type {ApiResponse} from "@/types/responses";

import {Prisma, type Collaborator} from "@prisma/client";
import axios from "axios";

import {serviceErrorHandler} from "@/helpers/error/service-handler";

export async function putCollaborator(
  data: Prisma.CollaboratorUpdateInput,
): Promise<ApiResponse<Collaborator>> {
  try {
    const {data: response} = await axios.put<ApiResponse<Collaborator>>(
      "/api/collaborator/update",
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
