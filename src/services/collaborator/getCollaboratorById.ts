import type {Collaborator} from "@prisma/client";

import {databaseClient} from "../../helpers/client/prisma";

export async function getCollaboratorById({
  id,
}: {
  id: Collaborator["id"];
}): Promise<Collaborator | null> {
  return await databaseClient.collaborator.findUnique({
    where: {
      id,
    },
  });
}
