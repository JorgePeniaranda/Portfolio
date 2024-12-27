import type {Colaborator} from "@prisma/client";

import {prisma} from "../../helpers/client/prisma-client";

export async function getAllColaboratorMin(): Promise<Pick<Colaborator, "id" | "nickname">[]> {
  return await prisma.colaborator.findMany({
    select: {
      id: true,
      nickname: true,
    },
  });
}
