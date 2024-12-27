import type {Colaborator} from "@prisma/client";

import {prisma} from "../../helpers/client/prisma-client";

export async function getColaboratorById({
  id,
}: {
  id: Colaborator["id"];
}): Promise<Colaborator | null> {
  return await prisma.colaborator.findUnique({
    where: {
      id,
    },
  });
}
