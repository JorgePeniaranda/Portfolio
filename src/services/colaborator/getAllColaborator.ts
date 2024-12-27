import type {Colaborator} from "@prisma/client";

import {prisma} from "../../helpers/client/prisma-client";

export async function getAllColaborator(): Promise<Colaborator[]> {
  return await prisma.colaborator.findMany();
}
