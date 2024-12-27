import type {Colaborator} from "@prisma/client";

import {databaseClient} from "../../helpers/client/prisma";

export async function getAllColaborator(): Promise<Colaborator[]> {
  return await databaseClient.colaborator.findMany();
}
