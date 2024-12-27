import type {Stack} from "@prisma/client";

import {prisma} from "../../helpers/client/prisma-client";

export async function getAllStack(): Promise<Stack[]> {
  return await prisma.stack.findMany();
}
