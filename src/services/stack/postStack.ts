import type {ApiResponse} from "@/types/responses";

import {Prisma, type Stack} from "@prisma/client";
import axios from "axios";

export async function postStack(data: Prisma.StackUpdateInput): Promise<ApiResponse<Stack>> {
  const {data: response} = await axios.post<ApiResponse<Stack>>("/api/stack/create", data);

  return response;
}
