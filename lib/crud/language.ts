import { InferSelectModel, eq, sql } from "drizzle-orm";
import { db } from "../db";
import {
  language,
  localSite,
  localUserLanguage,
  site,
  siteLanguage,
} from "../db/schema/schema";
import { LanguageId } from "lemmy-js-client";

export async function getLanguages() {
  const response = await db.select().from(language);
  return response;
}

export async function getSiteLanguageRaw() {
  const response = await db
    .select({
      languageId: siteLanguage.language_id,
    })
    .from(site)
    .innerJoin(localSite, eq(site.id, localSite.id))
    .innerJoin(siteLanguage, eq(site.id, siteLanguage.id))
    .orderBy(siteLanguage.id);

  return fiddle(response);
}

const fiddle = (
  items: { languageId: InferSelectModel<typeof language>["id"] }[],
): LanguageId[] => {
  return items.map((item) => item.languageId);
};

export async function getLocalUserLanguage(
  localUserId: InferSelectModel<typeof localUserLanguage>["id"],
) {
  const response = await db
    .select({
      languageId: localUserLanguage.id,
    })
    .from(localUserLanguage)
    .where(eq(localUserLanguage.local_user_id, localUserId))
    .orderBy(localUserLanguage.id);

  const ids = response.map((row) => row.languageId);
  return convertReadLanguages(ids);
}

// If all languages are returned, return empty vec instead
const convertReadLanguages = async (
  languageIds: InferSelectModel<typeof language>["id"][],
) => {
  const response = await db
    .select({
      count: sql<number>`count(*)`,
    })
    .from(language);

  const count = response[0]?.count;

  if (languageIds.length === count) {
    return [];
  }
  return languageIds;
};
