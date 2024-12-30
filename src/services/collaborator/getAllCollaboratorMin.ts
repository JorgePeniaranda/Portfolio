import type {Collaborator} from "@prisma/client";

import {databaseClient} from "../../helpers/client/prisma";

export async function getAllCollaboratorMin(): Promise<Pick<Collaborator, "id" | "nickname">[]> {
  return await databaseClient.collaborator.findMany({
    select: {
      id: true,
      nickname: true,
    },
  });
}
