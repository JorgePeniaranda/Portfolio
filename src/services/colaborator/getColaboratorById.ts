import type {Colaborator} from "@prisma/client";

import {databaseClient} from "../../helpers/client/prisma";

export async function getColaboratorById({
  id,
}: {
  id: Colaborator["id"];
}): Promise<Colaborator | null> {
  return await databaseClient.colaborator.findUnique({
    where: {
      id,
    },
  });
}
