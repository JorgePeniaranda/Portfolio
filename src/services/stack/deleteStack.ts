import type {ApiResponse} from "@/types/responses";
import type {Stack} from "@prisma/client";

import axios from "axios";

export async function deleteStack(data: Stack["id"][]): Promise<ApiResponse<Stack>> {
  const {data: response} = await axios.post("/api/stack/delete", data);

  return response;
}
