import type {ApiResponse} from "@/types/responses";

import {Prisma, type Stack} from "@prisma/client";
import axios from "axios";

export async function putStack(data: Prisma.StackUpdateInput): Promise<ApiResponse<Stack>> {
  const {data: response} = await axios.put<ApiResponse<Stack>>("/api/stack/update", data);

  return response;
}
