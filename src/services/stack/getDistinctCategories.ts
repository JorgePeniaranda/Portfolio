import {databaseClient} from "@/helpers/client/prisma";

export async function getDistinctCategories(): Promise<Array<string | null>> {
  const data = await databaseClient.stack.findMany({
    select: {
      category: true,
    },
    distinct: ["category"],
  });

  return data.map((item) => item.category);
}
