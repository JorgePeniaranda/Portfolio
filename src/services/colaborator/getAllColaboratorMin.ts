import type {Colaborator} from "@prisma/client";

import {databaseClient} from "../../helpers/client/prisma";

export async function getAllColaboratorMin(): Promise<Pick<Colaborator, "id" | "nickname">[]> {
  return await databaseClient.colaborator.findMany({
    select: {
      id: true,
      nickname: true,
    },
  });
}
