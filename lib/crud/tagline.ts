import { InferSelectModel, eq } from "drizzle-orm";
import { db } from "../db";
import { localSite, tagline } from "../db/schema/schema";
import { Tagline } from "lemmy-js-client";
import { replaceNullWithUndefined } from "../utils/replaceNullWithUndefined";

export async function getAllTaglines(
  localSiteId: InferSelectModel<typeof localSite>["id"],
) {
  const response = await db
    .select()
    .from(tagline)
    .where(eq(localSite.id, localSiteId));

  return fiddle(response);
}

const fiddle = (items: InferSelectModel<typeof tagline>[]): Tagline[] => {
  return replaceNullWithUndefined(items);
};
