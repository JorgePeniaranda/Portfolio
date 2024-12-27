import type {Stack} from "@prisma/client";

import {databaseClient} from "../../helpers/client/prisma";

export async function getAllStack(): Promise<Stack[]> {
  return await databaseClient.stack.findMany();
}
