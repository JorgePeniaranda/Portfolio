import type {Stack} from "@prisma/client";

import {databaseClient} from "@/helpers/client/prisma";

export async function getAllStackMin(): Promise<Pick<Stack, "id" | "name" | "iconUrl">[]> {
  return await databaseClient.stack.findMany({
    select: {
      id: true,
      name: true,
      iconUrl: true,
    },
  });
}
