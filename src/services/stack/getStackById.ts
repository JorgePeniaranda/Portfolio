import type {Stack} from "@prisma/client";

import {prisma} from "../../helpers/client/prisma-client";

export async function getStackById({id}: {id: Stack["id"]}): Promise<Stack | null> {
  return await prisma.stack.findUnique({
    where: {
      id,
    },
  });
}
