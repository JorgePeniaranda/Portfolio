import type {Stack} from "@prisma/client";

import {databaseClient} from "../../helpers/client/prisma";

export async function getStackById({id}: {id: Stack["id"]}): Promise<Stack | null> {
  return await databaseClient.stack.findUnique({
    where: {
      id,
    },
  });
}
