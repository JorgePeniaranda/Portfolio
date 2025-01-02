import type {Collaborator} from "@prisma/client";

import {databaseClient} from "@/helpers/client/prisma";

export async function getAllCollaborator(): Promise<Collaborator[]> {
  return await databaseClient.collaborator.findMany();
}
