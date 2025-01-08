import type {ApiResponse} from "@/types/responses";

import {Prisma, type Stack} from "@prisma/client";
import axios from "axios";

import {serviceErrorHandler} from "@/helpers/error/service-handler";

export async function postStack(data: Prisma.StackUpdateInput): Promise<ApiResponse<Stack>> {
  try {
    const {data: response} = await axios.post<ApiResponse<Stack>>("/api/stack/create", data);

    return response;
  } catch (error) {
    return {
      success: false,
      message: serviceErrorHandler(error),
    };
  }
}
