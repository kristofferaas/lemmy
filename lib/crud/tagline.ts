import { InferSelectModel, eq } from "drizzle-orm";
import { db } from "../db";
import { localSite, tagline } from "../db/schema/schema";

export async function getAllTaglines(
  localSiteId: InferSelectModel<typeof localSite>["id"]
) {
  const response = await db
    .select()
    .from(tagline)
    .where(eq(localSite.id, localSiteId));
  return response;
}
