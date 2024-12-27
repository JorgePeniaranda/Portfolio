import type {Stack} from "@prisma/client";

import {prisma} from "../../helpers/client/prisma-client";

export async function getAllStackMin(): Promise<Pick<Stack, "id" | "name" | "iconUrl">[]> {
  return await prisma.stack.findMany({
    select: {
      id: true,
      name: true,
      iconUrl: true,
    },
  });
}
